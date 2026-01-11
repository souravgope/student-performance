
# Student Performance Prediction

A web application to predict a student’s **math score** based on their **reading and writing scores**.  
Built with **Python (Flask)** for the backend and **React (Vite)** for the frontend.

---

## Features

- Predict math scores using a simple form.
- Interactive frontend with charts.
- Backend API hosted on **Render**.
- Frontend hosted on **Vercel**.

---

## Project Structure

```

student-performance/
│
├─ backend/
│  ├─ app.py
│  ├─ model.py
│  ├─ model.pkl
│  ├─ scaler.pkl
│  └─ dataset/
│      └─ StudentsPerformance.csv
│
├─ frontend/student-ui/
│  ├─ src/
│  │   ├─ App.jsx
│  │   ├─ components/
│  │   └─ ...
│  └─ package.json
│
└─ train.py

````

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/souravgope/student-performance.git
cd student-performance
````

---

### 2. Train the Model (One-time)

Make sure the dataset is in `backend/dataset/StudentsPerformance.csv`.

```bash
python train.py
```

This will create:

* `backend/model.pkl`
* `backend/scaler.pkl`

---

### 3. Backend Setup

#### Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

#### Run locally:

```bash
python app.py
```

API endpoint:

```
http://localhost:5000/predict
```

Deployed Backend URL:

```
https://student-performance-2-3xl8.onrender.com/
```

---

### 4. Frontend Setup

#### Install dependencies:

```bash
cd frontend/student-ui
npm install
```

#### Update API URL in `PredictionForm.jsx`:

```javascript
axios.post("https://student-performance-2-3xl8.onrender.com/predict", {
  math_score: Number(math),
  reading_score: Number(reading),
  writing_score: Number(writing)
});
```

#### Run locally:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173/
```

---

### 5. Deploy Frontend (Vercel)

1. Login to [Vercel](https://vercel.com/).
2. Click **New Project** → Import from **GitHub**.
3. Set **Root Directory** to `frontend/student-ui`.
4. Set **Build Command**:

```
npm run build
```

5. Set **Output Directory**:

```
dist
```

6. Deploy and get your live URL.

---

### 6. Using the App

1. Open frontend URL.
2. Enter **Math**, **Reading**, and **Writing scores**.
3. Click **Predict**.
4. See the predicted math score and chart.

---

### 7. Technologies Used

* **Backend:** Python, Flask, scikit-learn, pandas
* **Frontend:** React, Vite, Axios
* **Deployment:** Render (backend), Vercel (frontend)

---

### 8. Notes

* Make sure `model.pkl` and `scaler.pkl` are present in `backend`.
* Update API URL in frontend before deployment.
* Dataset is required for retraining the model.

