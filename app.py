from flask import Flask, jsonify, request
app = Flask(__name__)
scores = []
@app.route("/save-score", methods=["POST"])
def save_score():
    data = request.get_json()
    name = "Om"
    score = data["score"]
    scores.append({
        "name": name,
        "score": score
    })
    print(scores)
    return jsonify({"message": "saved"})

if __name__ == "__main__":
    app.run(debug=True)
