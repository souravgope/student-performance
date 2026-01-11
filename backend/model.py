import pandas as pd
import os
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "dataset", "StudentsPerformance.csv")

print("Loading dataset from:", DATA_PATH)

data = pd.read_csv(DATA_PATH)

X = data[['math score', 'reading score', 'writing score']]
y = ((X.mean(axis=1)) >= 50).astype(int)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = LogisticRegression()
model.fit(X_scaled, y)

