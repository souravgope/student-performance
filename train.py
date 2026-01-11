import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Path to the dataset
DATA_PATH = os.path.join("backend", "dataset", "StudentsPerformance.csv")

# Check if file exists
if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")

# Load data
data = pd.read_csv(DATA_PATH)

# Features and target
X = data[["math score", "reading score", "writing score"]]
y = data["math score"]  # Or whatever target you want to predict

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train model
model = LinearRegression()
model.fit(X_scaled, y)

# Save model and scaler in backend folder
joblib.dump(model, os.path.join("backend", "model.pkl"))
joblib.dump(scaler, os.path.join("backend", "scaler.pkl"))

print("Model and scaler saved successfully!")
