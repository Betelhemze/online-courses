import React from 'react'
import './footer.css'
import mail_icon from "../../assets/mail_icon.png";
import contact_icon from "../../assets/contact_icon.png";
import location_icon from "../../assets/location_icon.png";



const Footer = () => {
  return (
    <div className="footer container">
      <div className="sub-footer">
        <div className="footer-texts">
          <h4>Company Name</h4>
          <p>In this section it will talk about the company description</p>

          {/* Social Media */}
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-texts">
          <h4>Contact us</h4>
          <ul>
            <li>
              <img src={mail_icon} alt="" /> onlinecourse@gmail.com
            </li>
            <li>
              <img src={contact_icon} alt="" /> +251-911-111-111
            </li>
            <li>
              <img src={location_icon} alt="" /> Bole, Wolesefer, Ethiopia
            </li>
          </ul>
        </div>

        <div className="footer-texts">
          <h4>Quick links</h4>
          <p>Home</p>
          <p>About us</p>
          <p>Courses</p>
        </div>

        <div className="footer-texts">
          <h4>Support</h4>
          <p>Terms and services</p>
          <p>Privacy policy</p>
          <p>Cookie policy</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        © 2025 Company Name. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer
