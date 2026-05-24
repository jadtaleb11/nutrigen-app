import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* BRAND COLUMN */}
        <div className="footer-brand">
          <div className="logo">
            Nutri<span className="accent-text">Gen</span><span className="logo-dot">.</span>
          </div>
          <p className="brand-description">
            High-performance telemetry and modular optimization for your fitness, nutrition, and daily conditioning strategy.
          </p>
        </div>

        {/* NAVIGATION LINKS COLUMN */}
        <div className="footer-links-column">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/nutrition">Nutrition</Link></li>
            <li><Link to="/tracker">Tracker</Link></li>
            <li><Link to="/workouts">Workouts</Link></li>
          </ul>
        </div>

        {/* SUPPORT / COMPANY COLUMN */}
        <div className="footer-links-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>

      </div>

{/* BOTTOM BASELINE */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {currentYear} NutriGen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;