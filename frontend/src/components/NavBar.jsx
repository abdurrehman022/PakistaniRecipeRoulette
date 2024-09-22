import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/NavBar.css';
import logo from '/src/assets/pakistanireciperoulette.png'; // Import the logo

const NavBar = () => {
  const { authToken, user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Pakistani Recipe Roulette Logo" className="navbar-logo-image" /> {/* Add the logo image */}
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
            <NavLink to="/auth" className="navbar-button signin">Sign In</NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;