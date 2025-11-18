// src/components/Navigation.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';
import logo from "./logo.png"

const Navigation = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Stock Quote
          <img className="logo" src={logo}/>
        </Link>
        <div className="nav-menu">
          {token ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/stock-quote" className="nav-link">Stock Quote</Link>
              <span className="nav-user">{user?.email}</span>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;