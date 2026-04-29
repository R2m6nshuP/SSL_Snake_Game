from flask import Flask, jsonify, request
from datetime import datetime
import os

app = Flask(__name__, static_folder="Frontend", static_url_path="")

#serving html file
@app.route("/") 
def home():
    return app.send_static_file("snaky.html") 

# Main Task
@app.route("/save_score", methods=["POST"])
def save_score():
    data = request.get_json()  #getting JSON from javasript
    if not data:
        return jsonify({"Error" : "Invalid JSON"}), 400
    print("Data Recieved:", data) #for debugging
    # creating needed variables
    name = data.get("name")
    score = data.get("score")
    cause = data.get("cause")
    duration = data.get("duration")
    speed = data.get("speed")
    gameMode = data.get("gameMode")
    gridSize = data.get("gridSize")

    #verifying existence
    if name is None or score is None or cause is None or duration is None or speed is None or gameMode is None  or gridSize is None:
        return jsonify({"Error": "Missing Fields"}), 400
    #verifying their format
    if not isinstance(name, str):
        return jsonify({"Error" : "Name must be string"}), 400
    if not isinstance(gameMode, str):
        return jsonify({"Error" : "Gamemode must be string"}), 400
    if not isinstance(score, int):
        return jsonify({"Error" : "Score must be integer"}), 400
    if not isinstance(gridSize, (int, float)):
        return jsonify({"Error" : "GridSize must be integer"}), 400
    if cause not in ["WALL", "SELF", "QUIT"]:
        return jsonify({"Error" : "Invalid Cause of death"}), 400
    if not isinstance(duration, (int, float)):
        return jsonify({"Error" : "Duration must be integer"}), 400
    if speed not in ["SLOW", "MEDIUM", "FAST", "HELLMODE"]:
        return jsonify({"Error" : "Invalid Speed Mode"}), 400

    #entry to be saved
    name = name.strip()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{timestamp}] {name} | {gameMode} | {score} | {speed} | {cause} | {duration} | {gridSize}\n"

    #saving the entry to history.txt
    if not os.path.exists("history.txt"):
        open("history.txt", "w").close()
    try:
        with open("history.txt", "a") as f:
            f.write(line)
    except Exception as e:
        return jsonify({"Error" : str(e)}), 500

    print(line.strip()) #for debugging
    return jsonify({
        "status": "success",
        "saved" : {
            "name": name,
            "gameMode": gameMode,
            "score": score,
            "speed": speed,
            "cause": cause,
            "duration": duration,
            "gridSize": gridSize
        }
        }), 200


if __name__ == "__main__": 
    app.run(debug=True)
