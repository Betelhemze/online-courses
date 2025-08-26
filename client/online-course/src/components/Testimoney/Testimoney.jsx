import React from 'react'
import './testimoney.css'

function Testimoney  ()  {
  return (
    <>
    <div class="testimoney container">
      <div class="testimoney-text">
        <h2>testimoney</h2>
        <h3>Our Values in Action, Brighter Future through</h3>
      </div>

      <div class="testimoney-cards">
        <div class="testimoney-card">
          <p class="title">Innovation at the Core</p>
          <p>
            We prioritize innovation in everything we do. Our tech-driven
            approach ensures that we remain at the forefront of educational
            technology, constantly evolving to meet the changing needs of
            learners in a rapidly advancing digital landscape.
          </p>
        </div>

        <div class="testimoney-card">
          <p class="title">Excellence in Learning</p>
          <p>
            We are dedicated to providing high-quality educational solutions
            that empower learners to achieve their full potential.
          </p>
        </div>

        <div class="testimoney-card">
          <p class="title">Collaboration for Growth</p>
          <p>
            We believe in the power of collaboration and teamwork, fostering
            partnerships that enhance learning experiences.
          </p>
        </div>  
      </div>
    </div>
    <div className="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div className="faq-item">
    <button className="faq-question">What is this platform about?</button>
    <div className="faq-answer">
      <p>Our platform helps learners access curated courses with personalized recommendations and secure document flows.</p>
    </div>
  </div>

  <div className="faq-item">
    <button className="faq-question">Who can join?</button>
    <div className="faq-answer">
      <p>Students, instructors, and institutions — each with tailored access and tools.</p>
    </div>
  </div>

  {/* Add more FAQ items as needed */}
</div>
</>
  );
}

export default Testimoney
