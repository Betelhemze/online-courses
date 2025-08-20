import React from 'react'
import './Hero.css'
import arrow from "../../assets/arrow.png"
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
          <button className="btn">Get Started</button>
          <div className="explore-link">
            <a href="#">Explore</a>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero
