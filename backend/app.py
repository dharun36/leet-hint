
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for Chrome Extension

GEMINI_API_KEY = "AIzaSyA-4bT3ds6k2dQjPu4BbvS61ej5vGdAanQ"

@app.route("/get-hint", methods=["POST"])

def get_hint():
    data = request.json
    prompt = data.get("title", "")  # Now this is the full prompt from the frontend (user message or default)

    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    response = requests.post(gemini_url, headers=headers, json=payload)
    print(response.status_code, response.text)
    try:
        hint = response.json()['candidates'][0]['content']['parts'][0]['text']
    except Exception as e:
        hint = "Could not fetch hint. Try again later."
    print(f"Hint for prompt: {prompt}\n{hint}")
    return jsonify({"hint": hint})

if __name__ == "__main__":
    app.run(debug=True)
