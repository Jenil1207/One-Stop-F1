from fastapi import FastAPI, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import sqlite3
import uuid
import hashlib

app = FastAPI(title="F1 2026 Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = os.path.join(os.path.dirname(__file__), "f1_database.db")

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
            user_id TEXT PRIMARY KEY,
            email TEXT UNIQUE,
            password_hash TEXT,
            display_name TEXT,
            favorite_team TEXT,
            favorite_drivers TEXT -- JSON string
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS fantasy_teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            team_name TEXT,
            constructor TEXT,
            driver1 TEXT,
            driver2 TEXT,
            budget_spent INTEGER,
            total_points INTEGER DEFAULT 0,
            FOREIGN KEY(user_id) REFERENCES users(user_id)
        )
    ''')
    try:
        cursor.execute("ALTER TABLE fantasy_teams ADD COLUMN total_points INTEGER DEFAULT 0")
    except sqlite3.OperationalError:
        pass 
    conn.commit()
    conn.close()

init_db()

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

class AuthRegister(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    favorite_team: Optional[str] = None

class AuthLogin(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    user_id: str
    email: str
    display_name: str
    favorite_team: Optional[str] = None
    favorite_drivers: Optional[str] = None

class FantasyTeam(BaseModel):
    user_id: str
    team_name: str
    constructor: str
    driver1: str
    driver2: str
    budget_spent: int
    total_points: Optional[int] = 0

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "F1 2026 API is running!"}

@app.post("/api/auth/register", response_model=dict)
def register(req: AuthRegister, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT email FROM users WHERE email=?", (req.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Account with this email already exists.")
        
    user_id = str(uuid.uuid4())
    display_name = f"{req.first_name} {req.last_name}".strip()
    pwd_hash = hash_password(req.password)
    
    cursor.execute('''
        INSERT INTO users (user_id, email, password_hash, display_name, favorite_team, favorite_drivers)
        VALUES (?, ?, ?, ?, ?, '[]')
    ''', (user_id, req.email, pwd_hash, display_name, req.favorite_team))
    db.commit()
    return {
        "status": "success", 
        "user_id": user_id, 
        "email": req.email, 
        "display_name": display_name,
        "favorite_team": req.favorite_team,
        "favorite_drivers": "[]",
        "token": "mock_session_token_" + str(user_id)
    }

@app.post("/api/auth/login", response_model=dict)
def login(req: AuthLogin, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT user_id, email, password_hash, display_name, favorite_team, favorite_drivers FROM users WHERE email=?", (req.email,))
    user = cursor.fetchone()
    
    if not user or user["password_hash"] != hash_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
        
    return {
        "status": "success",
        "user_id": user["user_id"],
        "email": user["email"],
        "display_name": user["display_name"],
        "favorite_team": user["favorite_team"],
        "favorite_drivers": user["favorite_drivers"],
        "token": "mock_session_token_" + str(user["user_id"])
    }

@app.post("/api/users", response_model=dict)
def create_or_update_user(user: UserProfile, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO users (user_id, email, display_name, favorite_team, favorite_drivers)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
            email=excluded.email,
            display_name=excluded.display_name,
            favorite_team=COALESCE(excluded.favorite_team, users.favorite_team),
            favorite_drivers=COALESCE(excluded.favorite_drivers, users.favorite_drivers)
    ''', (user.user_id, user.email, user.display_name, user.favorite_team, user.favorite_drivers))
    db.commit()
    return {"status": "success", "message": "User saved."}

@app.get("/api/users/{user_id}", response_model=dict)
def get_user(user_id: str, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE user_id = ?', (user_id,))
    user = cursor.fetchone()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(user)

@app.post("/api/fantasy", response_model=dict)
def save_fantasy_team(team: FantasyTeam, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('DELETE FROM fantasy_teams WHERE user_id = ?', (team.user_id,))
    
    cursor.execute('''
        INSERT INTO fantasy_teams (user_id, team_name, constructor, driver1, driver2, budget_spent, total_points)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (team.user_id, team.team_name, team.constructor, team.driver1, team.driver2, team.budget_spent, team.total_points))
    db.commit()
    return {"status": "success", "message": "Fantasy team saved!"}

@app.get("/api/fantasy/leaderboard", response_model=dict)
def get_fantasy_leaderboard(db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('''
        SELECT ft.*, u.display_name 
        FROM fantasy_teams ft
        JOIN users u ON ft.user_id = u.user_id
        ORDER BY ft.total_points DESC 
        LIMIT 5
    ''')
    teams = [dict(row) for row in cursor.fetchall()]
    return {"status": "success", "leaderboard": teams}

@app.get("/api/fantasy/{user_id}", response_model=dict)
def get_fantasy_team(user_id: str, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM fantasy_teams WHERE user_id = ?', (user_id,))
    team = cursor.fetchone()
    if team is None:
        raise HTTPException(status_code=404, detail="Fantasy team not found")
    return dict(team)

def check_admin(user_id: str, db: sqlite3.Connection):
    cursor = db.cursor()
    cursor.execute("SELECT email FROM users WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()
    if not user or user["email"] != "test@example.com":
        raise HTTPException(status_code=403, detail="Not authorized as admin")

@app.get("/api/admin/fantasy_teams")
def admin_get_teams(admin_user_id: str, db: sqlite3.Connection = Depends(get_db)):
    check_admin(admin_user_id, db)
    cursor = db.cursor()
    cursor.execute('SELECT ft.*, u.email, u.display_name FROM fantasy_teams ft JOIN users u ON ft.user_id = u.user_id')
    return {"status": "success", "teams": [dict(r) for r in cursor.fetchall()]}

class AdminTeamUpdate(BaseModel):
    team_name: str
    constructor: str
    driver1: str
    driver2: str
    total_points: int

@app.put("/api/admin/fantasy_teams/{team_id}")
def admin_update_team(team_id: int, admin_user_id: str, req: AdminTeamUpdate, db: sqlite3.Connection = Depends(get_db)):
    check_admin(admin_user_id, db)
    cursor = db.cursor()
    cursor.execute('''
        UPDATE fantasy_teams 
        SET team_name=?, constructor=?, driver1=?, driver2=?, total_points=?
        WHERE id=?
    ''', (req.team_name, req.constructor, req.driver1, req.driver2, req.total_points, team_id))
    db.commit()
    return {"status": "success"}

@app.delete("/api/admin/fantasy_teams/{team_id}")
def admin_delete_team(team_id: int, admin_user_id: str, db: sqlite3.Connection = Depends(get_db)):
    check_admin(admin_user_id, db)
    cursor = db.cursor()
    cursor.execute('DELETE FROM fantasy_teams WHERE id=?', (team_id,))
    db.commit()
    return {"status": "success"}

@app.get("/")
def read_root():
    return FileResponse(os.path.join(os.path.dirname(__file__), "..", "index.html"))

app.mount("/", StaticFiles(directory=os.path.join(os.path.dirname(__file__), ".."), html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
