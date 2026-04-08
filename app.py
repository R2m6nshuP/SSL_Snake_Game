print("abc")
from flask import Flask, jsonify, request
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 
scores = [] 
@app.route("/") 
def home(): 
    print("abc") 
    return "Working!" 
@app.route("/save_score", methods=["POST"]) 
def save_score(): 
    data = request.get_json() 
    name = data["name"]
    score = data["score"]
    cause = data["cause"]
    duration = data["duration"]
    speed = data["speed"]
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    line = f"[{timestamp}] {name} | {score} | {speed} | {cause} | {duration}\n"

    with open("history.txt", "a") as f:
        f.write(line)

    print(line.strip()) 
    return jsonify({"message": "saved"})


if __name__ == "__main__": 
    app.run(debug=True, port=5000)
