
from pathlib import Path
import os

import mysql.connector
from dotenv import load_dotenv

# Load database configuration
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

# All places from peacefulMapPlaces
PLACES = [
    ("Temple", "Meenakshi Amman Temple", 9.9195, 78.1193,
     "Madurai's famous historic temple known for its colourful gopurams and Dravidian architecture."),

    ("Temple", "Thirupparankundram", 9.8815, 78.0733,
     "One of the six sacred abodes of Lord Murugan, known for its ancient rock-cut temple."),

    ("Temple", "Koodal Azhagar Temple", 9.9165, 78.1140,
     "An ancient Vishnu temple located in the heart of Madurai."),

    ("Temple", "Alagar Kovil", 10.0730, 78.2050,
     "A famous Vishnu temple situated in the scenic foothills of the Alagar Hills."),

    ("Heritage", "Goripalayam Dargah", 9.9310, 78.1230,
     "A well-known historic dargah and an important religious landmark in Madurai."),

    ("Heritage", "St. Mary's Cathedral Shrine Church", 9.9250, 78.1190,
     "A prominent historic Catholic church in Madurai known for its architecture."),

    ("Nature", "Teppakulam", 9.9087, 78.1433,
     "A large temple tank associated with the Vandiyur Mariamman Temple and the float festival."),

    ("Heritage", "Samanar Hills", 9.8960, 78.0270,
     "A historic hill featuring Jain beds, inscriptions and ancient rock carvings."),

    ("Nature", "Vaigai River", 9.9250, 78.1250,
     "The well-known river flowing through Madurai and closely connected with the city's identity."),

    ("Heritage", "Vilakkuthoon", 9.9165, 78.1230,
     "A historic landmark and recognisable junction in central Madurai."),

    ("Food", "Madurai Famous Jigarthanda - West Masi Street", 9.9190, 78.1160,
     "A popular area to experience Madurai's famous chilled Jigarthanda drink."),

    ("Food", "Konar Mess - Kari Dosa", 9.9250, 78.1280,
     "A well-known Madurai food destination associated with Kari Dosa."),

    ("Food", "Sri Meenakshi Paniyaram Shop", 9.9190, 78.1180,
     "A food stop for traditional South Indian paniyaram."),

    ("Food", "Madurai Bun Parotta Kadai", 9.9230, 78.1450,
     "A local food stop associated with Madurai-style Bun Parotta."),

    ("Food", "Sri Thirumalai Madai Karuppasamy Paruthi Paal", 9.9160, 78.1370,
     "A local destination for the traditional cottonseed milk drink called Paruthi Paal."),

    ("Food", "Sree Sabarees - Traditional Meals", 9.9170, 78.1190,
     "A restaurant option for traditional South Indian meals."),

    ("Nature", "Thiruparankundram ECO Park", 9.8810, 78.0710,
     "A green outdoor area around the Thiruparankundram region."),

    ("Nature", "Vandiyur Park", 9.9090, 78.1430,
     "An outdoor leisure spot in the Vandiyur area."),

    ("Nature", "Rajaji Park", 9.9300, 78.1200,
     "A public park in Madurai suitable for outdoor relaxation."),

    ("Heritage", "Tamukkam Ground Exhibition", 9.9340, 78.1310,
     "A well-known public ground used for exhibitions, fairs and events."),

    ("Historical", "Thirumalai Nayak Palace", 9.9173, 78.1193,
     "A 17th-century palace famous for its grand pillars and Indo-Saracenic architectural features."),

    ("Museum", "Gandhi Memorial Museum", 9.9300, 78.1380,
     "A museum documenting Mahatma Gandhi's life and India's freedom movement."),

    ("Heritage", "World Tamil Sangam", 9.9390, 78.1400,
     "A cultural institution celebrating Tamil language, literature and heritage."),

    ("Heritage", "Keeladi Archaeological Site", 9.8650, 78.1840,
     "An important archaeological site associated with ancient Tamil civilisation."),

    ("Museum", "Keeladi Museum", 9.8650, 78.1840,
     "A museum displaying archaeological discoveries from the Keeladi excavation area."),

    ("Temple", "Thirupparankundram Rock-Cut Temple", 9.8815, 78.0730,
     "An ancient rock-cut temple known for its religious and architectural significance."),

    ("Heritage", "Nandi Statue", 9.920259, 78.121776,
     "A religious and heritage landmark associated with the temple area."),

    ("Heritage", "Aayiram Kaal Mandapam", 9.9195, 78.1195,
     "The celebrated Thousand Pillar Hall inside the Meenakshi Amman Temple complex."),

    ("Heritage", "Pathu Thoon", 9.91702, 78.12368,
     "A local landmark known as Pathu Thoon in Madurai."),

    ("Temple", "Pazhamudircholai", 10.0740, 78.2120,
     "A sacred Murugan temple located amid the greenery of the Alagar Hills."),

    ("Nature", "Thirupparankundram Hills", 9.8795, 78.0745,
     "Rocky hills offering scenic surroundings near Thirupparankundram."),

    ("Nature", "Vandiyur Lake", 9.9110, 78.1460,
     "A lake area near Vandiyur, associated with the city's outdoor landscape."),

    ("Nature", "Yanai Hills", 9.9500, 78.0800,
     "A hill area in the wider Madurai region; verify the exact map pin before navigation."),

    ("Shopping", "Puthu Mandapam", 9.9188, 78.1190,
     "A historic pillared structure near Meenakshi Amman Temple, known for traditional shopping."),

    ("Shopping", "Madurai Flower Market", 9.9190, 78.1160,
     "A flower-shopping destination associated with Madurai Malli and other fresh flowers."),

    ("Shopping", "Anna Nagar", 9.9150, 78.1450,
     "A prominent Madurai neighbourhood with shops, cafes and everyday services."),

    ("Shopping", "Town Hall Road Shopping Area", 9.9175, 78.1190,
     "A busy shopping area in central Madurai."),

    ("Shopping", "Meenakshi Amman Temple Street", 9.9210, 78.1200,
     "The streets around the temple area, with shops selling souvenirs and traditional goods."),

    ("Transport", "Madurai Junction", 9.9175, 78.1195,
     "Madurai's major railway station serving the city and surrounding regions."),

    ("Transport", "Mattuthavani Bus Stand", 9.9395, 78.1405,
     "A major bus terminal serving routes to destinations around Madurai and beyond."),

    ("Transport", "Periyar Bus Stand", 9.9170, 78.1190,
     "A central bus stand with access to many parts of Madurai."),

    ("Transport", "Arappalayam Bus Stand", 9.9300, 78.0950,
     "A bus terminal serving routes from the Arappalayam area."),

    ("Transport", "Madurai Airport", 9.8345, 78.0935,
     "Madurai Airport, serving domestic and selected international flight routes."),
]


def main():
    connection = None
    cursor = None

    try:
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "127.0.0.1"),
            port=int(os.getenv("DB_PORT", "3307")),
            database=os.getenv("DB_NAME", "maduraiiyal_db"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", ""),
        )

        cursor = connection.cursor()

        cursor.execute("SELECT category_id, category_name FROM categories")
        categories = {
            name.strip().casefold(): category_id
            for category_id, name in cursor.fetchall()
        }

        inserted = 0
        updated = 0

        for category, name, latitude, longitude, description in PLACES:
            category_id = categories.get(category.casefold())

            if category_id is None:
                raise ValueError(
                    f"Category '{category}' not found. "
                    "Check the categories table before running the script."
                )

            cursor.execute(
                "SELECT place_id FROM places WHERE place_name = %s",
                (name,),
            )
            existing = cursor.fetchone()

            if existing:
                cursor.execute(
                    """
                    UPDATE places
                    SET category_id = %s,
                        description = %s,
                        latitude = %s,
                        longitude = %s
                    WHERE place_id = %s
                    """,
                    (
                        category_id,
                        description,
                        latitude,
                        longitude,
                        existing[0],
                    ),
                )
                updated += 1
            else:
                cursor.execute(
                    """
                    INSERT INTO places
                        (category_id, place_name, description, latitude, longitude)
                    VALUES (%s, %s, %s, %s, %s)
                    """,
                    (
                        category_id,
                        name,
                        description,
                        latitude,
                        longitude,
                    ),
                )
                inserted += 1

        connection.commit()

        cursor.execute("SELECT COUNT(*) FROM places")
        total = cursor.fetchone()[0]

        print("\nSUCCESS: Places saved successfully!")
        print(f"Places in this list: {len(PLACES)}")
        print(f"New places inserted: {inserted}")
        print(f"Existing places updated: {updated}")
        print(f"Total places in database: {total}")

    except Exception as error:
        if connection is not None:
            connection.rollback()
        print("ERROR: Places could not be saved.")
        print(error)
        raise

    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None and connection.is_connected():
            connection.close()


if __name__ == "__main__":
    main()
