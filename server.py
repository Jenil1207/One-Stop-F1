from fastapi import FastAPI, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import sqlite3

app = FastAPI(title="F1 2026 Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "f1_database.db"

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            firebase_uid TEXT PRIMARY KEY,
            email TEXT,
            display_name TEXT,
            favorite_team TEXT,
            favorite_drivers TEXT -- JSON string
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS fantasy_teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firebase_uid TEXT,
            team_name TEXT,
            constructor TEXT,
            driver1 TEXT,
            driver2 TEXT,
            budget_spent INTEGER,
            total_points INTEGER DEFAULT 0,
            FOREIGN KEY(firebase_uid) REFERENCES users(firebase_uid)
        )
    ''')
    try:
        cursor.execute("ALTER TABLE fantasy_teams ADD COLUMN total_points INTEGER DEFAULT 0")
    except sqlite3.OperationalError:
        pass 

    conn.commit()
    conn.close()

init_db()

class UserProfile(BaseModel):
    firebase_uid: str
    email: str
    display_name: str
    favorite_team: Optional[str] = None
    favorite_drivers: Optional[str] = None

class FantasyTeam(BaseModel):
    firebase_uid: str
    team_name: str
    constructor: str
    driver1: str
    driver2: str
    budget_spent: int
    total_points: Optional[int] = 0

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "F1 2026 API is running!"}

@app.post("/api/users", response_model=dict)
def create_or_update_user(user: UserProfile, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO users (firebase_uid, email, display_name, favorite_team, favorite_drivers)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(firebase_uid) DO UPDATE SET
            email=excluded.email,
            display_name=excluded.display_name,
            favorite_team=COALESCE(excluded.favorite_team, users.favorite_team),
            favorite_drivers=COALESCE(excluded.favorite_drivers, users.favorite_drivers)
    ''', (user.firebase_uid, user.email, user.display_name, user.favorite_team, user.favorite_drivers))
    db.commit()
    return {"status": "success", "message": "User saved."}

@app.get("/api/users/{firebase_uid}", response_model=dict)
def get_user(firebase_uid: str, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE firebase_uid = ?', (firebase_uid,))
    user = cursor.fetchone()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(user)

@app.post("/api/fantasy", response_model=dict)
def save_fantasy_team(team: FantasyTeam, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('DELETE FROM fantasy_teams WHERE firebase_uid = ?', (team.firebase_uid,))
    
    cursor.execute('''
        INSERT INTO fantasy_teams (firebase_uid, team_name, constructor, driver1, driver2, budget_spent, total_points)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (team.firebase_uid, team.team_name, team.constructor, team.driver1, team.driver2, team.budget_spent, team.total_points))
    db.commit()
    return {"status": "success", "message": "Fantasy team saved!"}

@app.get("/api/fantasy/leaderboard", response_model=dict)
def get_fantasy_leaderboard(db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('''
        SELECT ft.*, u.display_name 
        FROM fantasy_teams ft
        JOIN users u ON ft.firebase_uid = u.firebase_uid
        ORDER BY ft.total_points DESC 
        LIMIT 5
    ''')
    teams = [dict(row) for row in cursor.fetchall()]
    return {"status": "success", "leaderboard": teams}

@app.get("/api/fantasy/{firebase_uid}", response_model=dict)
def get_fantasy_team(firebase_uid: str, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM fantasy_teams WHERE firebase_uid = ?', (firebase_uid,))
    team = cursor.fetchone()
    if team is None:
        raise HTTPException(status_code=404, detail="Fantasy team not found")
    return dict(team)

@app.get("/")
def read_root():
    return FileResponse("index.html")

app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
