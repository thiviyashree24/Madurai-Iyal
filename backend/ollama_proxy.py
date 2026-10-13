import hmac
import json
import os
import urllib.error
import urllib.request

from flask import Flask, jsonify, request, Response

app = Flask(__name__)

PROXY_TOKEN = os.environ.get("OLLAMA_PROXY_TOKEN", "")
OLLAMA_URL = "http://127.0.0.1:11434/api/chat"
MAX_BODY_SIZE = 64 * 1024


@app.route("/api/chat", methods=["POST"])
def proxy_chat():
    if not PROXY_TOKEN:
        return jsonify({"error": "Proxy authentication is not configured."}), 503

    auth = request.headers.get("Authorization", "")
    expected = f"Bearer {PROXY_TOKEN}"

    if not hmac.compare_digest(auth, expected):
        return jsonify({"error": "Unauthorized"}), 401

    if not request.is_json:
        return jsonify({"error": "JSON required"}), 415

    body = request.get_data()

    if len(body) > MAX_BODY_SIZE:
        return jsonify({"error": "Request too large"}), 413

    try:
        payload = json.loads(body)

        if not isinstance(payload, dict):
            return jsonify({"error": "Invalid JSON body"}), 400

        if payload.get("model") != "qwen2.5:3b":
            return jsonify({"error": "Model not allowed"}), 400

        req = urllib.request.Request(
            OLLAMA_URL,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        with urllib.request.urlopen(req, timeout=180) as upstream:
            response_body = upstream.read()
            return Response(
                response_body,
                status=upstream.status,
                content_type="application/json",
            )

    except (json.JSONDecodeError, UnicodeDecodeError):
        return jsonify({"error": "Invalid JSON"}), 400
    except urllib.error.HTTPError as exc:
        return Response(
            exc.read(),
            status=exc.code,
            content_type="application/json",
        )
    except Exception:
        app.logger.exception("Ollama proxy request failed")
        return jsonify({"error": "Ollama is unavailable"}), 502


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=False)