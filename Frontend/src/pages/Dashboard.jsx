import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../api/apiClient';
import sportsBg from '../assets/sports.jpg'; // import local image

export default function Dashboard() {
  const [stats, setStats] = useState({ sports:0, teams:0, players:0, matches:0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [sp, tm, pl, mt] = await Promise.all([
          api.get('/api/sports'),
          api.get('/api/teams'),
          api.get('/api/players'),
          api.get('/api/matches')
        ]);
        setStats({
          sports: sp.data.length,
          teams: tm.data.length,
          players: pl.data.length,
          matches: mt.data.length
        });
      } catch(e) { console.error(e); }
    }
    loadStats();
  }, []);

  // Floating icons data
  // const floatingIcons = ['⚽','🏀','🏈','🎾','🏐'];

  return (
    <div 
      className="dashboard-hero" 
      style={{ backgroundImage: `url(${sportsBg})` }}
    >
      <div className="overlay">
        {/* Floating sports icons
        {floatingIcons.map((icon, i) => (
          <span key={i} className={`floating-icon icon-${i}`}>{icon}</span>
        ))} */}

        <div className="container">
          <h1 className="hero-title">Welcome to SportSphere</h1>
          <p className="hero-sub">Manage sports, teams, players and matches efficiently</p>

          <div className="grid" style={{ marginTop: 24 }}>
            <Card title="Quick Actions">
              <p className="small">Add sports, teams, players or schedule matches quickly.</p>
            </Card>
            <Card title="Live Overview">
              <p className="small">
                Total Sports: {stats.sports} <br/>
                Total Teams: {stats.teams} <br/>
                Total Players: {stats.players} <br/>
                Ongoing Matches: {stats.matches}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
