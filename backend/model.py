import joblib

# Load trained model and scaler
model = joblib.load("backend/model.pkl")
scaler = joblib.load("backend/scaler.pkl")

print("Model and scaler loaded successfully")
