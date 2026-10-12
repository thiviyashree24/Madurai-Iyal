from pathlib import Path
import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv(Path("backend/.env"))

connection = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT", "3307")),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)

categories = [
    ("Temple", "Temples and places of worship in Madurai"),
    ("Historical", "Historic buildings, palaces and monuments"),
    ("Museum", "Museums and cultural collections"),
    ("Heritage", "Archaeological sites and heritage locations"),
    ("Nature", "Natural attractions, hills and water bodies"),
    ("Shopping", "Markets, shopping streets and local crafts"),
    ("Food", "Traditional Madurai food and dining"),
    ("Festival", "Festivals and cultural celebrations"),
    ("Transport", "Transport facilities and travel information"),
    ("Emergency Services", "Emergency assistance and public services")
]

try:
    cursor = connection.cursor()
    cursor.executemany(
        """
        INSERT INTO categories (category_name, description)
        VALUES (%s, %s)
        ON DUPLICATE KEY UPDATE description = VALUES(description)
        """,
        categories
    )
    connection.commit()

    cursor.execute(
        "SELECT category_id, category_name FROM categories ORDER BY category_id"
    )
    for row in cursor.fetchall():
        print(row)

    print("\nCategories saved successfully!")

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
