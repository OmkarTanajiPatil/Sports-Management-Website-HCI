from flask import Flask
from flask_cors import CORS
from matches import matches_bp
from player import player_bp
from team import team_bp
from sports import sports_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(matches_bp, url_prefix="/matches")
app.register_blueprint(player_bp, url_prefix="/players")
app.register_blueprint(team_bp, url_prefix="/teams")
app.register_blueprint(sports_bp, url_prefix="/sports")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
