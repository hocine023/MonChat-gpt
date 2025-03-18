import pymysql

# Configuration de la connexion
HOST = "localhost"
USER = "root"
PASSWORD = ""  # Pas de mot de passe
DATABASE = "chatbot"
PORT = 3306

try:
    # Connexion à MySQL
    connection = pymysql.connect(
        host=HOST,
        user=USER,
        password=PASSWORD,
        database=DATABASE,
        port=PORT
    )

    print("✅ Connexion réussie à MySQL !")

    # Vérification des tables
    with connection.cursor() as cursor:
        cursor.execute("SHOW TABLES;")
        tables = cursor.fetchall()
        print("📂 Tables dans la base de données :")
        for table in tables:
            print("-", table[0])

except pymysql.MySQLError as e:
    print("❌ Erreur de connexion :", e)

finally:
    if "connection" in locals() and connection.open:
        connection.close()
        print("🔌 Connexion fermée.")
