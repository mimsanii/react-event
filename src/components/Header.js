import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Mobile Footer Icons */}
      {isMobile && (
        <div className="footer-icons">
          <Link to="/" className="nav-link">
            <i className="fas fa-home" />
          </Link>
          <Link to="/create-event" className="nav-link">
            <i className="fas fa-calendar-plus" />
          </Link>
          <Link to="/about" className="nav-link">
            <i className="fas fa-info-circle" />
          </Link>
          <Link to="/testimonials" className="nav-link">
            <i className="fas fa-comments" />
          </Link>
        </div>
      )}

      {/* Regular Header (Desktop version) */}
      <header className="header">
        <div className="logo">
          <h1>
            Event<span>Book</span>
          </h1>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">
            {!isMobile && "Home"}
          </Link>
          <Link to="/create-event" className="nav-link">
            {!isMobile && "Create Event"}
          </Link>
          <Link to="/about" className="nav-link">
            {!isMobile && "About"}
          </Link>
          <Link to="/testimonials" className="nav-link">
            {!isMobile && "Testimonials"}
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
