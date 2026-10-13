from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import os
from pathlib import Path
import mysql.connector
from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from flask_cors import CORS
import json
import urllib.error
import urllib.request
# Load settings from backend/.env
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")
app = Flask(__name__)

app.secret_key = os.getenv("FLASK_SECRET_KEY")

app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=os.getenv("COOKIE_SECURE", "false").lower() == "true",
    PERMANENT_SESSION_LIFETIME=60 * 60 * 8,
)
CORS(
    app,
    supports_credentials=True,
    origins=[
         "https://madurai-iyal-oiskdt7bm-madurai-iyal.vercel.app",
        "https://madurai-iyal.vercel.app",
        "https://thiviyashree24.github.io",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
)
def get_db_connection():
    """Create a secure MySQL database connection."""
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),
        port=int(os.getenv("DB_PORT", "3307")),
        database=os.getenv("DB_NAME", "maduraiiyal_db"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        ssl_ca=os.getenv("DB_SSL_CA") or None,
        ssl_verify_cert=bool(os.getenv("DB_SSL_CA")),
    )
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "app": "MADURAI IYAL",
        "assistant": "Vaigai",
        "status": "Backend is running successfully"
    })


@app.route("/api/health", methods=["GET"])
def health():
    connection = None
    try:
        connection = get_db_connection()
        return jsonify({
            "status": "healthy",
            "service": "MADURAI IYAL API",
            "database": "connected"
        }), 200
    except mysql.connector.Error:
        app.logger.exception("Database health check failed")
        return jsonify({
            "status": "unhealthy",
            "service": "MADURAI IYAL API",
            "database": "disconnected"
        }), 503
    finally:
        if connection is not None and connection.is_connected():
            connection.close()


@app.route("/api/places", methods=["GET"])
def get_places():
    category = request.args.get("category", "").strip()
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT
                p.place_id AS id,
                p.place_name AS name,
                c.category_name AS category,
                p.description AS description,
                p.latitude AS latitude,
                p.longitude AS longitude,
                p.address AS address,
                p.opening_hours AS opening_hours,
                p.entry_fee AS entry_fee,
                p.best_time_to_visit AS best_time_to_visit
            FROM places p
            LEFT JOIN categories c
                ON p.category_id = c.category_id
        """
        params = []

        if category:
            query += " WHERE LOWER(c.category_name) = LOWER(%s)"
            params.append(category)

        query += " ORDER BY p.place_id"
        cursor.execute(query, params)
        rows = cursor.fetchall()

        places = []
        for row in rows:
            place = dict(row)
            for field in ("latitude", "longitude", "entry_fee"):
                if place[field] is not None:
                    place[field] = float(place[field])
            places.append(place)

        return jsonify({
            "count": len(places),
            "places": places
        }), 200

    except mysql.connector.Error:
        app.logger.exception("Failed to retrieve places from database")
        return jsonify({
            "error": "Unable to retrieve places at this time."
        }), 500

    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None and connection.is_connected():
            connection.close()


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}

    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not full_name or not email or not password:
        return jsonify({
            "error": "Name, email and password are required."
        }), 400

    if len(full_name) > 150 or len(email) > 255:
        return jsonify({
            "error": "Name or email is too long."
        }), 400

    if "@" not in email or "." not in email.rsplit("@", 1)[-1]:
        return jsonify({
            "error": "Please enter a valid email address."
        }), 400

    if not isinstance(password, str) or len(password) < 8:
        return jsonify({
            "error": "Password must contain at least 8 characters."
        }), 400

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO users (full_name, email, password_hash)
            VALUES (%s, %s, %s)
            """,
            (
                full_name,
                email,
                generate_password_hash(password)
            )
        )

        connection.commit()

        return jsonify({
            "message": "Registration successful."
        }), 201

    except mysql.connector.IntegrityError as error:
        if error.errno == 1062:
            return jsonify({
                "error": "This email is already registered."
            }), 409

        app.logger.exception("Registration database error")
        return jsonify({
            "error": "Unable to register right now."
        }), 500

    except mysql.connector.Error:
        app.logger.exception("Registration database error")
        return jsonify({
            "error": "Unable to register right now."
        }), 500

    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None and connection.is_connected():
            connection.close()

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}

    email = data.get("email", "")
    password = data.get("password", "")

    if not isinstance(email, str) or not isinstance(password, str):
        return jsonify({"error": "Invalid email or password."}), 400

    email = email.strip().lower()

    if not email or not password:
        return jsonify({
            "error": "Email and password are required."
        }), 400

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT user_id, full_name, email, password_hash
            FROM users
            WHERE email = %s AND is_active = 1
            """,
            (email,)
        )

        user = cursor.fetchone()

        if not user or not check_password_hash(
            user["password_hash"], password
        ):
            return jsonify({
                "error": "Invalid email or password."
            }), 401
        session.clear()
        session.permanent = True
        session["user_id"] = user["user_id"]
        session["full_name"] = user["full_name"]
        session["email"] = user["email"]
        return jsonify({
            "message": "Login successful.",
            "user": {
                "user_id": user["user_id"],
                "full_name": user["full_name"],
                "email": user["email"]
            }
        }), 200

    except mysql.connector.Error:
        app.logger.exception("Login database error")
        return jsonify({
            "error": "Unable to login right now."
        }), 500

    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None and connection.is_connected():
            connection.close()

@app.route("/api/me", methods=["GET"])
def current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({
            "error": "Please login first."
        }), 401

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT user_id, full_name, email
            FROM users
            WHERE user_id = %s AND is_active = 1
            """,
            (user_id,)
        )

        user = cursor.fetchone()

        if not user:
            session.clear()
            return jsonify({
                "error": "User not found or inactive."
            }), 401

        return jsonify({
            "user": {
                "user_id": user["user_id"],
                "full_name": user["full_name"],
                "email": user["email"]
            }
        }), 200

    except mysql.connector.Error:
        app.logger.exception("Current user lookup failed")
        return jsonify({
            "error": "Unable to verify login right now."
        }), 500

    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None and connection.is_connected():
            connection.close()
@app.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({
        "message": "Logout successful."
    }), 200

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "")

    if not isinstance(message, str) or not message.strip():
        return jsonify({"error": "Please enter a message."}), 400

    if len(message) > 2000:
        return jsonify({
            "error": "Message is too long. Please use 2000 characters or fewer."
        }), 400

    connection = None
    cursor = None

    try:
        # Retrieve local place information for the AI context.
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT
                p.place_name, c.category_name, p.description,
                p.address, p.opening_hours, p.entry_fee,
                p.best_time_to_visit
            FROM places p
            LEFT JOIN categories c ON p.category_id = c.category_id
            ORDER BY p.place_id
        """)
        rows = cursor.fetchall()

        place_context = "\n".join(
            f"Place: {row['place_name']}; "
            f"Category: {row['category_name'] or 'Other'}; "
            f"Description: {row['description'] or 'Not available'}; "
            f"Address: {row['address'] or 'Not available'}; "
            f"Opening hours: {row['opening_hours'] or 'Not available'}; "
            f"Entry fee: {row['entry_fee'] if row['entry_fee'] is not None else 'Not available'}; "
            f"Best time to visit: {row['best_time_to_visit'] or 'Not available'}"
            for row in rows
        )

    except mysql.connector.Error:
        app.logger.exception("Could not load place context for chat")
        return jsonify({
            "error": "Unable to load Madurai place information right now."
        }), 500

    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None and connection.is_connected():
            connection.close()

    try:
        system_prompt = (
            "You are Vaigai, a helpful and accurate local tourism guide for Madurai, Tamil Nadu. "
            "Reply in the same language as the user's latest question: Tamil or English. "
            "For Tamil, use natural, simple, grammatically correct Tamil. "
            "For mixed Tamil-English questions, respond naturally in the same mix. "
            "Answer the exact question first. Keep answers clear and concise. "
            "Use the supplied database for Madurai place facts. Never invent addresses, "
            "opening hours, entry fees, or coordinates. If a detail is unavailable, say so. "
            "Do not repeat sentences or use meaningless words. "
            "Use previous messages only to understand follow-up questions.\n\n"
            f"Madurai places database information:\n{place_context}"
        )

        history = data.get("history", [])
        if not isinstance(history, list):
            history = []

        chat_messages = [{"role": "system", "content": system_prompt}]

        for item in history[-10:]:
            if not isinstance(item, dict):
                continue

            role = item.get("role")
            content = item.get("content", item.get("text", ""))

            if (
                role in ("user", "assistant")
                and isinstance(content, str)
                and content.strip()
                and len(content) <= 2000
            ):
                chat_messages.append({
                    "role": role,
                    "content": content.strip()
                })

        chat_messages.append({
            "role": "user",
            "content": message.strip()
        })

        payload = {
            "model": "qwen2.5:3b",
            "stream": False,
            "messages": chat_messages,
            "options": {
                "temperature": 0.2,
                "num_predict": 220
            }
        }
        req = urllib.request.Request(
            f"{os.getenv('OLLAMA_BASE_URL', 'http://127.0.0.1:11434').rstrip('/')}/api/chat",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )

        with urllib.request.urlopen(req, timeout=180) as response:
            result = json.loads(response.read().decode("utf-8"))

        answer = result.get("message", {}).get("content", "").strip()
        if not answer:
            return jsonify({
                "error": "Vaigai could not generate a response. Please try again."
            }), 502

        return jsonify({
            "assistant": "Vaigai",
            "reply": answer
        }), 200

    except Exception:
        app.logger.exception("Local Ollama chat request failed")
        return jsonify({
            "error": (
                "Vaigai is temporarily unavailable. "
                "Please check whether Ollama is running."
            )
        }), 502


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )






