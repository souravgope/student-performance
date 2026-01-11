from flask import Flask, request, jsonify
import numpy as np
from model import model, scaler
from flask_cors import CORS

# Create Flask app first
app = Flask(__name__)

# Enable CORS
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return "Student Performance Prediction API is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([
        data["math_score"],
        data["reading_score"],
        data["writing_score"]
    ]).reshape(1, -1)

    # Scale input
    features = scaler.transform(features)

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]

    result = "Pass" if prediction == 1 else "Fail"

    return jsonify({
        "prediction": result,
        "confidence": round(probability * 100, 2)
    })

if __name__ == "__main__":
    app.run()

