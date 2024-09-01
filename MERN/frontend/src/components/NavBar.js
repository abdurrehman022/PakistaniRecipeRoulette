import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/NavBar.css";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Pakistani Recipe Roulette</h1>
      </div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/roulette" className={location.pathname === '/roulette' ? 'active' : ''}>Roulette</Link>
        <Link to="/recipes" className={location.pathname === '/recipes' ? 'active' : ''}>Recipes</Link>
        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;