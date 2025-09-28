import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Make sure this CSS file contains your CSS

export default function Navbar() {
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
  );
}
