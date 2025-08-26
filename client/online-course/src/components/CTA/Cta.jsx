import React from 'react'
import './cta.css'
import cta from '../../assets/cta.jpg'
import { Link } from 'react-router-dom'

const Cta = () => {
  return (
    <div className="cta container">
      <div className="cta-img">
        <img src={cta} />
      </div>
      <div className="cta-text">
        <p>
          Take the next big step and join us
          <br /> to learn skills that will give a new <br />
          skill to our new world
        </p>
        <p className="sub">Join us for a good learning experience</p>
        <Link to='/register'>Join Us</Link>
      </div>
    </div>
  );
}

export default Cta
