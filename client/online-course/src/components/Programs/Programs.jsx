import React from 'react'
import photoshop from '../../assets/photoshop.jpg'
import graphic from '../../assets/graphic.jpg'
import UI from '../../assets/UI.jpg'
import './programs.css'
import person from '../../assets/person.webp'
import heart from '../../assets/heart.svg'
import share from '../../assets/share.svg'
import save from '../../assets/save.svg'

const programs = () => {
  return (
    <div>
      <div className="program container">
        <div className="programs-text">
          <h3>Ready to Explore courses we give?</h3>
          <h2>Elevate your skills and have fun doing it!</h2>
        </div>
      </div>
      <div className="card-container">
        <div className="card">
          <img className="card-img" src={UI} alt="ui course" width="100px" />
          <div className="card-content">
            <h1>UI/UX Design</h1>
            <p>
              On this course, it covers about user interface and user
              experience. It helps learners to understand about color
              theory,layout, interactivity and making the users experience
              better.
            </p>
            <a href="#" className="card-btn">
              Learn-more
            </a>
          </div>
          <div className="name-container">
            <div className="name-img">
              <img className="imag-tag" src={person} alt="" />
              <div className="name-tag">
                <p>name 1</p>
                <p>0 videos</p>
              </div>
            </div>
          </div>
          <div className="icons-container">
            <button className="action-btn">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.1 21.35l-1.1-1.05C5.14 15.28 2 12.36 
              2 8.5 2 5.42 4.42 3 7.5 3c1.74 
              0 3.41 0.81 4.5 2.09C13.09 3.81 
              14.76 3 16.5 3 19.58 3 22 5.42 
              22 8.5c0 3.86-3.14 6.78-8.9 
              11.8l-1 1.05z"
                />
              </svg>
            </button>
            <button className="action-btn">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
              </svg>
            </button>
            <button className="action-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 
              5V4a2 2 0 0 1 2-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img"
            src={graphic}
            alt="ui course"
            width="100px"
          />
          <div className="card-content">
            <h1>UI/UX Design</h1>
            <p>
              On this course, it covers about user interface and user
              experience. It helps learners to understand about color
              theory,layout, interactivity and making the users experience
              better.
            </p>
            <a href="#" className="card-btn">
              Learn-more
            </a>
          </div>
          <div className="name-container">
            <div className="name-img">
              <img className="imag-tag" src={person} alt="" />
              <div className="name-tag">
                <p>name 2</p>
                <p>0 videos</p>
              </div>
            </div>
          </div>
          <div className="icons-container">
            <button className="action-btn">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.1 21.35l-1.1-1.05C5.14 15.28 2 12.36 
              2 8.5 2 5.42 4.42 3 7.5 3c1.74 
              0 3.41 0.81 4.5 2.09C13.09 3.81 
              14.76 3 16.5 3 19.58 3 22 5.42 
              22 8.5c0 3.86-3.14 6.78-8.9 
              11.8l-1 1.05z"
                />
              </svg>
            </button>
            <button className="action-btn">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
              </svg>
            </button>
            <button className="action-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 
              5V4a2 2 0 0 1 2-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img"
            src={photoshop}
            alt="ui course"
            width="100px"
          />
          <div className="card-content">
            <h1>UI/UX Design</h1>
            <p>
              On this course, it covers about user interface and user
              experience. It helps learners to understand about color
              theory,layout, interactivity and making the users experience
              better.
            </p>
            <a href="#" className="card-btn">
              Learn-more
            </a>
          </div>
          <div className="name-container">
            <div className="name-img">
              <img className="imag-tag" src={person} alt="" />
              <div className="name-tag">
                <p>name 3</p>
                <p>0 videos</p>
              </div>
            </div>
          </div>
          <div className="icons-container">
            <button className="action-btn">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.1 21.35l-1.1-1.05C5.14 15.28 2 12.36 
              2 8.5 2 5.42 4.42 3 7.5 3c1.74 
              0 3.41 0.81 4.5 2.09C13.09 3.81 
              14.76 3 16.5 3 19.58 3 22 5.42 
              22 8.5c0 3.86-3.14 6.78-8.9 
              11.8l-1 1.05z"
                />
              </svg>
            </button>
            <button className="action-btn">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
              </svg>
            </button>
            <button className="action-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                stroke="black"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 
              5V4a2 2 0 0 1 2-2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="about-us container">
        <div className="about-text">
          <h2>Learn simpler</h2>
          <h3>Our Values in Action, Brighter Future through</h3>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <div className="icon-box">⚡</div>
            <p>Innovation at the Core</p>
            <p>
              We prioritize innovation in everything we do. Our tech-driven
              approach ensures that we remain at the forefront of educational
              technology, constantly evolving to meet the changing needs of
              learners in a rapidly advancing digital landscape.
            </p>
            <a href="#" className="about-btn">
              Learn more →
            </a>
          </div>

          <div className="about-card">
            <div className="icon-box">👥</div>
            <p>Empowering the Future</p>
            <p>
              We prioritize innovation in everything we do. Our tech-driven
              approach ensures that we remain at the forefront of educational
              technology, constantly evolving to meet the changing needs of
              learners in a rapidly advancing digital landscape.
            </p>
            <a href="#" className="about-btn">
              Learn more →
            </a>
          </div>

          <div className="about-card">
            <div className="icon-box">📅</div>
            <p>Lifelong Learning</p>
            <p>
              We prioritize innovation in everything we do. Our tech-driven
              approach ensures that we remain at the forefront of educational
              technology, constantly evolving to meet the changing needs of
              learners in a rapidly advancing digital landscape.
            </p>
            <a href="#" className="about-btn">
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default programs
