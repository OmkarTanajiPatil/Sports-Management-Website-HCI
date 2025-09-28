from flask import Blueprint, request, jsonify
from trial import get_connection

matches_bp = Blueprint("matches", __name__)

# Add match with status and winner
@matches_bp.route("/add", methods=["POST"])
def add_match():
    data = request.json
    required_fields = ["match_name", "teamA", "teamB", "start_date", "end_date", "location", "winner"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO matches (match_name, teamA, teamB, start_date, end_date, location, status, winner) "
        "VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
        (data["match_name"], data["teamA"], data["teamB"], data["start_date"], data["end_date"], data["location"], "pending", data["winner"])
    )
    conn.commit()
    match_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({"message": "Match added successfully", "match_id": match_id})

# Get all matches
@matches_bp.route("/", methods=["GET"])
def get_matches():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM matches ORDER BY start_date DESC")
    matches = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(matches)

# Update match status & winner
@matches_bp.route("/status/<int:match_id>", methods=["PUT"])
def update_status(match_id):
    data = request.json
    status = data.get("status")
    winner = data.get("winner")

    if not status:
        return jsonify({"error": "status required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE matches SET status=%s, winner=%s WHERE match_id=%s",
        (status, winner, match_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": f"Match {match_id} updated"})
