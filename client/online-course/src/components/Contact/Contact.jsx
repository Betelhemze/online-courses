import React from 'react'
import './contact.css'
import mail_icon from '../../assets/mail_icon.png'
import contact_icon from '../../assets/contact_icon.png'
import location_icon from '../../assets/location_icon.png'
const Contact = () => {
  return (
    <div className="contact">
      {/* Title at the very top */}
      <div className="contact-title">
        <h2>Contact Us</h2>
        <h3>Get in touch</h3>
      </div>

      {/* Columns below */}
      <div className="contact-row">
        <div className="contact-col">
          <h3>Send us a message</h3>
          <p>
            Feel free to reach out through contact form or find our company
            information below. Your feedback, questions, and suggestions are
            important to us as we thrive to provide exceptional service to our
            community.
          </p>
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

        <div className="contact-col">
          <form>
            <label>Your name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              required
            />
            <label>Write your message here</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Enter your message here"
              required
            ></textarea>
            <button type="submit" className="contact-btn">
              Submit
            </button>
          </form>
          <span>Sending</span>
        </div>
      </div>
    </div>
  );
}

export default Contact
