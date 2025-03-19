# 📌 HammyBot - Chatbot React + Flask

HammyBot est une application de chatbot interactive construite avec **React (Frontend)** et **Flask (Backend)**. Ce guide explique comment installer et exécuter le projet sur votre machine.

---

## 🚀 1. Prérequis
Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (avec npm ou yarn) → [Télécharger ici](https://nodejs.org/)
- **Python (>=3.7)** pour exécuter Flask
- **MySQL** (via XAMPP ou un serveur MySQL local)
- **Git** pour cloner le projet (optionnel mais recommandé)

---

## 📂 2. Installation du projet

Commencez par cloner le dépôt et naviguer dans le dossier du projet :

```sh
git clone https://github.com/ton-repo/MonChat-gpt.git
cd MonChat-gpt
```

Le projet est divisé en deux parties :
- **Backend (API Flask) →** dans le dossier `backend`
- **Frontend (React) →** dans le dossier `frontend`

---

## ⚡ 3. Installation et configuration du backend (Flask + MySQL)

📌 **Accédez au dossier `backend/` et installez les dépendances :**

```sh
cd backend
```

### 🏗️ Créer un environnement virtuel (optionnel mais recommandé)
```sh
python -m venv venv
source venv/bin/activate  # (Mac/Linux)
venv\Scripts\activate    # (Windows)
```

### 📦 Installer Flask, MySQL et les dépendances requises
```sh
pip install flask flask-cors flask-sqlalchemy pymysql requests python-dotenv
```

### ⚙️ Configurer MySQL
1. Assurez-vous que MySQL (XAMPP ou autre) est en cours d'exécution.
2. Créez une base de données nommée **`chatbot`**.
4. Executer les requetes du fichier `chatbot.sql` . 
3. Vérifiez que votre fichier `app.py` contient la bonne configuration MySQL :

```python
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root@localhost/chatbot?charset=utf8mb4"
```

4. Chargez les variables d'environnement avec un fichier **`.env`** dans `backend/` :

```
HF_API_TOKEN=your_huggingface_api_key
```



### 🚀 Démarrer le serveur Flask
```sh
python app.py  # ou flask run
```

L'API devrait maintenant être accessible sur `http://127.0.0.1:5000/chat` 🚀

---

## 🎨 4. Installation et exécution du frontend (React)

📌 **Ouvrez un nouveau terminal, puis accédez au dossier `frontend/` et installez les dépendances :**

```sh
cd ../frontend
```

### 📦 Installer les dépendances
```sh
npm install  # ou yarn install
```

### 🔥 Démarrer l'application React
```sh
npm start  # ou yarn start
```

L'application React devrait maintenant être accessible sur `http://localhost:3000/` 🎉

---

## 🎯 5. Tester l'application

Une fois que **le backend (Flask) et le frontend (React)** sont en cours d'exécution :
- Ouvrir **http://localhost:3000/** dans un navigateur
- Vérifier que HammyBot répond aux messages

---

## 📢 6. Dépendances utilisées

### 📌 Frontend (React)
```sh
npm install react framer-motion styled-components axios
```
- `react` → Librairie principale
- `framer-motion` → Animations React
- `styled-components` → Styles CSS dynamiques
- `axios` → Requêtes HTTP vers l'API Flask

### 📌 Backend (Flask + MySQL)
```sh
pip install flask flask-cors flask-sqlalchemy pymysql requests python-dotenv
```
- `flask` → Framework backend léger
- `flask-cors` → Gestion des requêtes entre domaines
- `flask-sqlalchemy` → ORM pour interagir avec MySQL
- `pymysql` → Connecteur MySQL pour Python
- `requests` → Appels API externes (Hugging Face)
- `python-dotenv` → Charger les variables d'environnement

---


## 🎉 8. Félicitations !
Vous avez maintenant HammyBot fonctionnel sur votre machine 🚀. Amusez-vous bien ! 🎊

