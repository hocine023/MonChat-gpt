import os
import pymysql
import requests
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration MySQL (XAMPP)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root@localhost/chatbot?charset=utf8mb4"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Modèle pour stocker les conversations
class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_input = db.Column(db.Text, nullable=False)
    bot_response = db.Column(db.Text, nullable=False)

# Créer la base de données si elle n'existe pas
with app.app_context():
    db.create_all()

# Route pour envoyer un message et recevoir une réponse
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Requête au modèle Hugging Face
    MODEL_NAME = "tiiuae/falcon-7b-instruct" 
    API_URL = f"https://api-inference.huggingface.co/models/{MODEL_NAME}"
    headers = {"Authorization": f"Bearer {os.getenv('HF_API_TOKEN')}", "Content-Type": "application/json"}

    try:
        response = requests.post(API_URL, headers=headers, json={"inputs": user_message})
        response_json = response.json()
        
        print(response_json)  

        # Vérifier si le format de réponse est correct
        if isinstance(response_json, list) and len(response_json) > 0 and "generated_text" in response_json[0]:
            bot_reply = response_json[0]["generated_text"].strip()
        else:
            bot_reply = "I'm not sure how to respond to that."

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

    # Supprimer la répétition de la question dans la réponse
    if bot_reply.lower().startswith(user_message.lower()):
        bot_reply = bot_reply[len(user_message):].strip()

    # Sauvegarde dans MySQL
    new_entry = Conversation(user_input=user_message, bot_response=bot_reply)
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({"user": user_message, "bot": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
