from flask import Blueprint, request, jsonify
from trial import get_connection

player_bp = Blueprint("player", __name__)

# Add player
@player_bp.route("/add", methods=["POST"])
def add_player():
    data = request.form  # use form for file upload
    file = request.files.get('doc')  # optional document

    if not data.get("first_name") or not data.get("team_id"):
        return jsonify({"error": "first_name and team_id required"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO players (first_name, middle_name, last_name, dob, ph_number, team_id) VALUES (%s,%s,%s,%s,%s,%s)",
        (
            data["first_name"],
            data.get("middle_name"),
            data.get("last_name"),
            data.get("dob"),
            data.get("ph_number"),
            data["team_id"]
        )
    )
    conn.commit()
    player_id = cursor.lastrowid
    cursor.close()
    conn.close()

    # Optionally, save file path in DB if file uploaded
    if file:
        filename = f"uploads/{player_id}_{file.filename}"
        file.save(filename)
        # update DB with file path
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE players SET doc_path=%s WHERE player_id=%s", (filename, player_id))
        conn.commit()
        cursor.close()
        conn.close()

    return jsonify({"message": "Player added", "player_id": player_id}), 201

# Get all players in a team
@player_bp.route("/team/<int:team_id>", methods=["GET"])
def get_players_in_team(team_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM players WHERE team_id = %s", (team_id,))
    players = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(players), 200
