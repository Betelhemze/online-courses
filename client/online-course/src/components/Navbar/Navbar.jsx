import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="container">
      <ul className="nav-left">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Courses</a>
        </li>
      </ul>
      <div className="nav-search">
        <input type="text" placeholder="Search courses..." />
      </div>
      <ul className="nav-right">
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <button className="btn">Register</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar
