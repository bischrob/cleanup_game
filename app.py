from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ allow all origins for now

SCORE_FILE = 'scores.json'

# Load scores or initialize if not present


def load_scores():
    if not os.path.exists(SCORE_FILE):
        return {"parentScore": 0, "kidScore": 0, "weekStart": ""}
    with open(SCORE_FILE, 'r') as f:
        return json.load(f)

# Save scores


def save_scores(data):
    with open(SCORE_FILE, 'w') as f:
        json.dump(data, f)


@app.route('/scores', methods=['GET'])
def get_scores():
    return jsonify(load_scores())


@app.route('/scores', methods=['POST'])
def post_scores():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    save_scores(data)
    return jsonify({"status": "ok"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8002)
