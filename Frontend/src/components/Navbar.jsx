import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(){
  return (
    <div className="nav container">
      <div className="brand">SportSphere</div>
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/sports">Sports</NavLink>
      <NavLink to="/teams">Teams</NavLink>
      <NavLink to="/players">Players</NavLink>
      <NavLink to="/matches">Matches</NavLink>
      <NavLink to="/results">Results</NavLink>
    </div>
  );
}
