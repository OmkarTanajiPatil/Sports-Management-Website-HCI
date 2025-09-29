import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            port=3306,
            user="root",
            password="pass",
            database="sportsdb"
        )
        return conn
    except Error as e:  
        print("Error while connecting to MySQL", e)
        return None

if __name__ == "__main__":
    conn = get_connection()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT VERSION()")
        print("Database version:", cursor.fetchone())
        cursor.close()
        conn.close()
