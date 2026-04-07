print("abc")
from flask import Flask, jsonify, request 
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 
scores = [] 
@app.route("/") 
def home(): 
    print("abc") 
    return "Working!" 
@app.route("/save-score", methods=["POST"]) 
def save_score(): 
    data = request.get_json() 
    name = data["name"] 
    score = data["score"] 
    scores.append({ "name": name, "score": score }) 
    print(scores) 
    return jsonify({"message": "saved"}) 
if __name__ == "__main__": 
    app.run(debug=True, port=5000)
