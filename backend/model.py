import pandas as pd
import os

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# ---------------------------
# Load dataset safely
# ---------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "dataset", "StudentsPerformance.csv")

data = pd.read_csv(DATA_PATH)

# ---------------------------
# Feature Engineering
# ---------------------------
data['average_score'] = (
    data['math score'] +
    data['reading score'] +
    data['writing score']
) / 3

# Target variable (Pass / Fail)
data['final_result'] = data['average_score'].apply(
    lambda x: 1 if x >= 50 else 0
)

# ---------------------------
# Features & Target
# ---------------------------
X = data[['math score', 'reading score', 'writing score']]
y = data['final_result']

# ---------------------------
# Train-test split
# ---------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ---------------------------
# Feature Scaling
# ---------------------------
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# ---------------------------
# Train model
# ---------------------------
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# ---------------------------
# Model Evaluation
# ---------------------------
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("Model Accuracy:", round(accuracy * 100, 2), "%")
