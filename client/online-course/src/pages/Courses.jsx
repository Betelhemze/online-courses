import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses/');
        setCourses(response.data);
      } catch (error) {
        setError('Failed to fetch courses');
        console.error('Error fetching courses:', error);
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
      <div className="container">
        <h1>Available Courses</h1>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} />
                ) : (
                  <div className="course-placeholder">No Image</div>
                )}
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="course-level">{course.level}</span>
                  <span className="course-duration">{course.duration} hours</span>
                </div>
                <div className="course-footer">
                  <span className="course-price">
                    {course.price > 0 ? `$${course.price}` : 'Free'}
                  </span>
                  <Link to={`/courses/${course.id}`} className="btn btn-small">
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;