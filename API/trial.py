import mysql.connector
from mysql.connector import Error

try:
    conn = mysql.connector.connect(
        host="127.0.0.1", port=3306, user="root", password="", database="testdb"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT VERSION()")
    print(cursor.fetchone())
    # parameterized query example
    cursor.execute("SELECT * FROM users WHERE id = %s", (1,))
    row = cursor.fetchone()
    print(row)
finally:
    if cursor:
        cursor.close()
    if conn and conn.is_connected():
        conn.close()
