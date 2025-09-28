import React from "react";
import Card from "../components/Card";
import img from "../assets/banner.png";
import "./Dashboard.css"; // CSS file for styling

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h2>Welcome to SportSphere</h2>
            <div className="small">A creative sports management dashboard</div>
          </div>
          <Card title="Quick Actions">
            <div className="small">
              Add sports, teams, players or start scheduling matches quickly.
            </div>
          </Card>
          <Card title="Live Overview">
            <div className="small">
              This area can show stats (total sports, teams, players, ongoing
              matches).
            </div>
          </Card>
        </div>
        <div className="dashboard-image">
          <img src={img} alt="Sports Illustration" />
        </div>
      </div>
    </div>
  );
}
