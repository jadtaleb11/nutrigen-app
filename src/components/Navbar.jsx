import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO WITH INTENTIONAL SPACING */}
        <div className="logo" onClick={closeMenu}>
          Nutri<span className="accent-text">Gen</span>
          <span className="logo-dot">.</span>
        </div>
        
        {/* RIGHT SIDE DESKTOP ACTIONS */}
        <ul className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/nutrition" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={closeMenu}>
              Nutrition
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracker" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={closeMenu}>
              Tracker
            </NavLink>
          </li>
          <li>
            <NavLink to="/workouts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={closeMenu}>
              Workouts
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* COMPACT & MINIMAL HAMBURGER TOGGLE */}
        <button 
          className={`menu-toggle ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle Navigation Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;