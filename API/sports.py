from flask import Blueprint, jsonify, request
from trial import get_connection

sports_bp = Blueprint("sports", __name__)

# Get all sports
@sports_bp.route("/", methods=["GET"])
def get_sports():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    # print("this is databse: ", cursor)
    cursor.execute("SELECT * FROM sports")
    sports = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(sports)

@sports_bp.route("/", methods=["POST"])
def add_sport():
    data = request.get_json()
    name = data.get("name")
    if not name:
        return jsonify({"error": "Name is required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO sports (sport_name) VALUES (%s)", (name,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Sport added"}), 201