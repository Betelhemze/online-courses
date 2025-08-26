import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./course.css";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses/");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to fetch courses");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="courses-page">

      {/* Tagline + Search */}
      <section className="courses-hero">
        <h2>Explore Courses</h2>
        <p>Find the right course for you and start learning today!</p>
        <div className="search-bar">
          <input type="text" placeholder="Search courses..." />
          <button>Search</button>
        </div>
      </section>

      {/* Main Layout */}
      <div className="courses-container">
        {/* Filters */}
        <aside className="filter-section">
          <h3>Filter by</h3>
          <div className="filter-group">
            <h4>Price</h4>
            <label>
              <input type="checkbox" /> Free
            </label>
            <label>
              <input type="checkbox" /> Paid
            </label>
          </div>

          <div className="filter-group">
            <h4>Level</h4>
            <label>
              <input type="checkbox" /> Beginner
            </label>
            <label>
              <input type="checkbox" /> Intermediate
            </label>
            <label>
              <input type="checkbox" /> Advanced
            </label>
          </div>

          <div className="filter-group">
            <h4>Subject</h4>
            <label>
              <input type="checkbox" /> Programming
            </label>
            <label>
              <input type="checkbox" /> Design
            </label>
            <label>
              <input type="checkbox" /> Marketing
            </label>
          </div>

          <div className="filter-group">
            <h4>Duration</h4>
            <label>
              <input type="checkbox" /> Less than 2h
            </label>
            <label>
              <input type="checkbox" /> 2 - 5h
            </label>
            <label>
              <input type="checkbox" /> 5 - 10h
            </label>
            <label>
              <input type="checkbox" /> 10h+
            </label>
          </div>
        </aside>

        {/* Courses Grid */}
        <main className="courses-list">
          {/* Sorting Dropdown */}
          <div className="sorting-bar">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort">
              <option>Newest</option>
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="card-container">
            {courses.map((course) => (
              <div key={course.id} className="card">
                <img
                  className="card-img"
                  src={course.thumbnail || "/assets/default-course.jpg"}
                  alt={course.title}
                />

                <div className="card-content">
                  <h1>{course.title}</h1>
                  <p>{course.description}</p>
                  <Link to={`/courses/${course.id}`} className="card-btn">
                    Learn More
                  </Link>
                </div>

                {/* Instructor info */}
                <div className="name-container">
                  <div className="name-img">
                    <img
                      className="imag-tag"
                      src="/assets/instructor.png"
                      alt="instructor"
                    />
                    <div className="name-tag">
                      <p>{course.instructor || "Unknown Instructor"}</p>
                      <p>{course.videos || 0} videos</p>
                    </div>
                  </div>
                </div>

                {/* icons */}
                <div className="icons-container">
                  <button className="action-btn">♥</button>
                  <button className="action-btn">⤴</button>
                  <button className="action-btn">🔖</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Course;
