import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const getActiveStyle = ({ isActive }) => ({
    background: isActive ? 'linear-gradient(90deg,#2dd4bf,#60a5fa)' : 'transparent',
    color: isActive ? '#052128' : '#9aa4b2',
    boxShadow: isActive ? '0 6px 15px rgba(45,212,191,0.3)' : 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    transition: 'all 0.2s',
  });

  return (
    <div className="nav navbar">
      <div className="brand">SportSphere</div>
      <div className="nav-links">
        <NavLink to="/" end style={getActiveStyle}>Dashboard</NavLink>
        <NavLink to="/sports" style={getActiveStyle}>Sports</NavLink>
        <NavLink to="/teams" style={getActiveStyle}>Teams</NavLink>
        <NavLink to="/players" style={getActiveStyle}>Players</NavLink>
        <NavLink to="/matches" style={getActiveStyle}>Matches</NavLink>
        <NavLink to="/results" style={getActiveStyle}>Results</NavLink>
      </div>
    </div>
  );
}
