import os
from pathlib import Path

import mysql.connector
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)

try:
    connection = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        port=int(os.getenv("DB_PORT", "3307")),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD", ""),
        connection_timeout=5
    )

    if connection.is_connected():
        print("SUCCESS: MySQL connection established!")
        print("Database:", connection.database)

        cursor = connection.cursor()
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()

        print("Tables found:", len(tables))
        for table in tables:
            print("-", table[0])

        cursor.close()
        connection.close()

except mysql.connector.Error as error:
    print("MySQL connection failed.")
    print("Error:", error)
