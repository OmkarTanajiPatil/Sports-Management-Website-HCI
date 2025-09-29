import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Make sure this CSS file contains your CSS

export default function Navbar() {
<<<<<<< HEAD
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
=======
  return (
    <nav className="navbar">
      <div className="navbar-logo">SportSphere</div>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Dashboard</NavLink></li>
        <li><NavLink to="/sports">Sports</NavLink></li>
        <li><NavLink to="/teams">Teams</NavLink></li>
        <li><NavLink to="/players">Players</NavLink></li>
        <li><NavLink to="/matches">Matches</NavLink></li>
        <li><NavLink to="/results">Results</NavLink></li>
      </ul>
    </nav>
>>>>>>> ec79867fda4430c2f70a2689b0bdf99802fcbb82
  );
}
