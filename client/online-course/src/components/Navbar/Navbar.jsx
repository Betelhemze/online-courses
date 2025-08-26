import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
 const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">EduPlatform</Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <ul className="nav-left">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
        <div className="nav-search">
          <input type="text" placeholder="Search courses..." />
        </div>

        <ul className="nav-right">
          <li>
            <Link to="/about" className="a">About Us</Link>
          </li>
          <li>
            <a href="/#contact-us" className="a">Contact Us</a>
          </li>

          {user ? (
            <>
              {/* Show Create Course link for teachers/admins */}
              {(user.role === "teacher" || user.role === "admin") && (
                <li>
                  <Link to="/create-course">Create Course</Link>
                </li>
              )}
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li className="user-greeting">
                Hello, {user.first_name || user.username}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <button className="btn">Log In</button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <button className="btn">Register</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
