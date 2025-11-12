import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

DB_NAME = "users.db"

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Drop old invalid table (to fix the 'no password column' issue)
    cursor.execute("DROP TABLE IF EXISTS users")

    # Create fresh table with correct schema
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def register_user(username, password):
    conn = get_db()
    cursor = conn.cursor()
    try:
        hashed_pw = generate_password_hash(password)
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_pw))
        conn.commit()
        return True, "User registered successfully."
    except sqlite3.IntegrityError:
        return False, "Username already exists."
    finally:
        conn.close()

def verify_user(username, password):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    conn.close()

    if user and check_password_hash(user["password"], password):
        return True
    return False

# Run this once when backend starts
if __name__ == "__main__":
    init_db()
    print("Database initialized successfully ✅")
