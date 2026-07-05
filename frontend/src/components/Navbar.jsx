import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation Bar Component
 * Provides navigation links and responsive design
 */
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo/Brand */}
        <Link to="/" className="nav-logo">
          📚 Student Management System
        </Link>

        {/* Navigation Links */}
        <div className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            🏠 Home
          </Link>
          <Link 
            to="/add-student" 
            className={`nav-link ${location.pathname === '/add-student' ? 'active' : ''}`}
          >
            ➕ Add Student
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;