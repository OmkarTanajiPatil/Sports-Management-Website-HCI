import React from 'react';
import Card from '../components/Card';

export default function Dashboard(){
  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
        <div>
          <h2 style={{margin:0}}>Welcome to SportSphere</h2>
          <div className="small">A creative sports management dashboard</div>
        </div>
      </div>

      <div className="grid">
        <Card title="Quick Actions">
          <div className="small">Add sports, teams, players or start scheduling matches quickly.</div>
        </Card>
        <Card title="Live Overview">
          <div className="small">This area can show stats (total sports, teams, players, ongoing matches).</div>
        </Card>
      </div>
    </div>
  );
}
