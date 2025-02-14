import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const location = useLocation(); // Get current route

  useEffect(() => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  }, []);

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
        {!loginCheck ? (
          <Link to="/" className="btn btn-primary me-2">Login</Link>
        ) : (
          <button 
            className="btn btn-danger" 
            onClick={() => auth.logout()}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;