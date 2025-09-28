from flask import Blueprint, request, jsonify
from trial import get_connection

team_bp = Blueprint("team", __name__)

# Add team
@team_bp.route("/add", methods=["POST"])
def add_team():
    data = request.json
    if not data.get("team_name") or not data.get("sport_id"):
        return jsonify({"error": "team_name and sport_id required"}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "INSERT INTO teams (team_name, leader, sport_id) VALUES (%s, %s, %s)",
        (data["team_name"], data.get("leader"), data["sport_id"])
    )
    conn.commit()
    team_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({"message": "Team added", "team_id": team_id}), 201

# Remove team
@team_bp.route("/remove/<int:team_id>", methods=["DELETE"])
def remove_team(team_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM teams WHERE team_id = %s", (team_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": f"Team {team_id} removed"}), 200

# Show total teams
@team_bp.route("/", methods=["GET"])
def get_teams():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM teams")
    teams = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(teams), 200

# Given sport -> Teams
@team_bp.route("/sport/<int:sport_id>", methods=["GET"])
def get_teams_by_sport(sport_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM teams WHERE sport_id = %s", (sport_id,))
    teams = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(teams), 200
