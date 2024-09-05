import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/NavBar.css';

const NavBar = () => {
  const { authToken, user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>Pakistani Recipe Roulette</span>
        </div>
        <div className="navbar-links-container">
          <div className="navbar-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active-link" : "navbar-link"}>Home</NavLink>
            <NavLink to="/roulette" className={({ isActive }) => isActive ? "navbar-link active-link" : "navbar-link"}>Roulette</NavLink>
            <NavLink to="/browse" className={({ isActive }) => isActive ? "navbar-link active-link" : "navbar-link"}>Browse Recipes</NavLink>
            {authToken && (
              <NavLink to="/favorites" className={({ isActive }) => isActive ? "navbar-link active-link" : "navbar-link"}>Favorites</NavLink>
            )}
          </div>
        </div>
        <div className="navbar-buttons">
          {authToken ? (
            <button className="navbar-button logout" onClick={logout}>Logout</button>
          ) : (
            <>
              <NavLink to="/login" className="navbar-button login">Login</NavLink>
              <NavLink to="/register" className="navbar-button register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;