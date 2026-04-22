# 🏎️ F1 Manager – Your One Stop F1 Solution

A full-stack web application delivering an immersive Formula 1 fan experience.
Users can explore teams, drivers, and circuits while accessing exclusive interactive features like fantasy team building and personality-based quizzes.

---

## 🚀 Features

### 🌐 Core Website

* 📰 Latest F1 News
* 📅 2026 Race Schedule
* 🏁 Teams & Drivers Overview
* 🏎️ Circuits Information
* 📊 Advanced Driver Comparison

### 🔐 Fan Zone (Authenticated)

* 🏆 **Fantasy Team Builder**

  * Budget-based team selection ($30M cap)
  * Choose 2 drivers + 1 constructor
  * Live leaderboard (Top 5 global teams)

* 🧠 **Driver Personality Quiz**

  * Discover which F1 driver matches your style

* ⚖️ **Advanced Comparison Tool**

  * Head-to-head telemetry-style analysis

* 🎯 **Onboarding System**

  * Select favorite drivers for personalization

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3 (Custom styling + responsive design)
* JavaScript 

### Backend

* FastAPI (Python)
* Uvicorn 
* SQLite (Database)
* Pydantic (Data validation)

### Authentication

* Firebase Authentication (UID-based user system)

---

## 📁 Project Structure

```
/project-root
│
├── index.html
├── fan-zone.html
├── drivers.html
├── teams.html
├── compare.html
├── contact.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   └── script.js
│
├── images/
│   └── (assets)
│
├── F1-logo.png
│
├── backend/
│   └── main.py
│
└── f1_database.db
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/f1-2026-hub.git
cd f1-2026-hub
```
Fill in the Firebase Config in auth.js for your respective project.

---

### 2️⃣ Install dependencies

```
pip install fastapi uvicorn pydantic firebase-admin
```

---

### 3️⃣ Run the backend server

```
python main.py
```

Server will start at:

```
http://127.0.0.1:8000
```

---

### 4️⃣ Open frontend

* Open `index.html` in browser
  OR
* Use Live Server (recommended)

---

## 🔌 API Endpoints

### 👤 Users

* `POST /api/users` → Create/update user
* `GET /api/users/{firebase_uid}` → Get user profile

### 🏆 Fantasy Teams

* `POST /api/fantasy` → Save fantasy team
* `GET /api/fantasy/{firebase_uid}` → Get user team
* `GET /api/fantasy/leaderboard` → Top 5 teams

### ❤️ Health Check

* `GET /api/health`

---

## 🧠 Key Concepts

* Dynamic UI rendering using JavaScript
* Budget-based selection logic
* Modal-driven UX
* LocalStorage for session persistence

---

## 🎯 SDG Alignment

This project aligns with:

* **SDG 9 – Industry, Innovation & Infrastructure**
  → Digital platform showcasing modern web development
  
---

## ⚠️ Disclaimer

This is a **personal/educational project**.
All Formula 1 logos and trademarks belong to their respective owners.

---

## 🔮 Future Improvements

* 🔐 Secure Firebase token verification
* 🧮 Backend-based points calculation
* 📱 Full mobile optimization

---
