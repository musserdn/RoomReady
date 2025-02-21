import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthService from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Navbar = () => {
  const location = useLocation(); // Get current route

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link 
            className={`nav-link ${location.pathname === "/MyDay" ? "active" : ""}`} 
            to="/MyDay"
          >
            Plan my day
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            className={`nav-link ${location.pathname === "/Guest" ? "active" : ""}`} 
            to="/Guest"
          >
            Room Status
          </Link>
        </li>
      </ul>
      <div className="ms-auto"> {/* Pushes content to the right */}
        {AuthService.loggedIn() ? (
          <button 
            className="btn btn-danger" 
            onClick={() => AuthService.logout()}
          >
            Logout
          </button>
        ) : (
          <Link to="/" className="btn btn-primary me-2">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;