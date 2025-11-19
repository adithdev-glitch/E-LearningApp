import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (isAuth) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="logo">Eonix</div>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Menu */}
      <nav className={menuOpen ? "open" : ""}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        {
          isAuth ? (
            <Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Get Started</Link>
          )
        }
      </nav>
    </header>
  );
};

export default Header;
