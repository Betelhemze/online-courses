import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero container">
      <div className="hero-text">
        <h1>We are changing the way people learn.</h1>
        <p>
          Step into the future of learning with PAPIRA's Virtual campus! Unleash
          your potential through our tailored courses and content. Join PAPIRA
          today to transform your future, and be part of a dynamic community. 🚀
        </p>
        <div className="btns">
          <Link to="/register" className="btn">Get Started</Link>
          <div className="explore-link">
            <Link to="/courses">Explore</Link>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;