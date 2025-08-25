import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/courses/${id}/`);
        setCourse(response.data);
        
        // Check if user is enrolled
        if (user) {
          setEnrolled(response.data.is_enrolled);
        }
      } catch (error) {
        setError('Failed to fetch course details');
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    try {
      await axios.post(`http://localhost:8000/api/courses/${id}/enroll/`);
      setEnrolled(true);
      alert('Successfully enrolled in the course!');
    } catch (error) {
      setError('Failed to enroll in course');
      console.error('Error enrolling:', error);
    }
  };

  if (loading) return <div className="loading">Loading course details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="error">Course not found</div>;

  return (
    <div className="course-detail-page">
      <div className="container">
        <div className="course-header">
          <div className="course-hero">
            {course.thumbnail ? (
              <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
            ) : (
              <div className="course-thumbnail-placeholder">
                {course.title}
              </div>
            )}
            <div className="course-info">
              <h1>{course.title}</h1>
              <p className="course-instructor">By {course.instructor}</p>
              <p className="course-description">{course.description}</p>
              
              <div className="course-meta">
                <span className="course-level">{course.level}</span>
                <span className="course-duration">{course.duration} hours</span>
                <span className="course-price">
                  {course.price > 0 ? `$${course.price}` : 'Free'}
                </span>
              </div>

              {user ? (
                enrolled ? (
                  <Link to="/dashboard" className="btn btn-success">
                    Go to Dashboard
                  </Link>
                ) : (
                  <button onClick={handleEnroll} className="btn btn-primary">
                    Enroll Now
                  </button>
                )
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login to Enroll
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="course-content">
          <div className="modules-section">
            <h2>Course Content</h2>
            {course.modules && course.modules.length > 0 ? (
              <div className="modules-list">
                {course.modules.map(module => (
                  <div key={module.id} className="module-card">
                    <h3>{module.title}</h3>
                    {module.description && <p>{module.description}</p>}
                    
                    {module.lessons && module.lessons.length > 0 && (
                      <div className="lessons-list">
                        {module.lessons.map(lesson => (
                          <div key={lesson.id} className="lesson-item">
                            <span className="lesson-title">{lesson.title}</span>
                            <span className="lesson-duration">{lesson.duration} min</span>
                            {lesson.is_free && <span className="free-badge">Free</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No content available yet.</p>
            )}
          </div>

          <div className="course-sidebar">
            <div className="sidebar-card">
              <h3>What you'll learn</h3>
              <ul>
                <li>Comprehensive understanding of the subject</li>
                <li>Practical skills and applications</li>
                <li>Industry best practices</li>
                <li>Hands-on project experience</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Requirements</h3>
              <ul>
                <li>Basic computer skills</li>
                <li>Internet connection</li>
                <li>Willingness to learn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;