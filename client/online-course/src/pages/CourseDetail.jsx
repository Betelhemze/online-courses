import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

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
    if (!user) {
      alert('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      const response = await axios.post(`http://localhost:8000/api/courses/${id}/enroll/`);
      
      if (response.status === 201 || response.status === 200) {
        setEnrolled(true);
        alert('Successfully enrolled in the course!');
        // Refresh course data to update enrollment status
        const courseResponse = await axios.get(`http://localhost:8000/api/courses/${id}/`);
        setCourse(courseResponse.data);
      }
    } catch (error) {
      console.error('Error enrolling:', error.response?.data);
      const errorMessage = error.response?.data?.error || 'Failed to enroll in course';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setEnrolling(false);
    }
  };

  const handlePreview = (lesson) => {
    if (lesson.video_url || lesson.is_free) {
      setPreviewVideo(lesson);
    } else {
      alert('Preview not available for this lesson');
    }
  };

  const closePreview = () => {
    setPreviewVideo(null);
  };

  if (loading) return (
    <div className="course-detail-page">
      <Navbar />
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading course details...</p>
      </div>
      <Footer />
    </div>
  );

  if (error) return (
    <div className="course-detail-page">
      <Navbar />
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Try Again
        </button>
      </div>
      <Footer />
    </div>
  );

  if (!course) return (
    <div className="course-detail-page">
      <Navbar />
      <div className="error-container">
        <h2>Course Not Found</h2>
        <p>The course you're looking for doesn't exist.</p>
        <Link to="/courses" className="btn btn-primary">
          Browse Courses
        </Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="course-detail-page">
      <Navbar />
      
      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="preview-modal">
          <div className="preview-content">
            <button className="close-preview" onClick={closePreview}>×</button>
            <h3>{previewVideo.title}</h3>
            <div className="video-container">
              {previewVideo.video_url ? (
                <video controls>
                  <source src={previewVideo.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="no-preview">
                  <p>No video preview available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                <span className="course-rating">
                  ⭐ {course.rating || '4.5'} ({course.reviews_count || 0} reviews)
                </span>
              </div>

              {/* ENROLLMENT BUTTON */}
              <div className="enrollment-section">
                {user ? (
                  enrolled ? (
                    <div className="enrollment-status">
                      <span className="enrolled-badge">✅ Already Enrolled</span>
                      <Link to="/dashboard" className="btn btn-success">
                        Go to Dashboard
                      </Link>
                    </div>
                  ) : (
                    <button 
                      onClick={handleEnroll} 
                      className="btn btn-primary enroll-btn"
                      disabled={enrolling}
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </button>
                  )
                ) : (
                  <div className="login-to-enroll">
                    <p>Please login to enroll in this course</p>
                    <Link to="/login" className="btn btn-primary">
                      Login to Enroll
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="course-content">
          <div className="modules-section">
            <h2>Course Content</h2>
            <div className="modules-stats">
              <span>{course.modules?.length || 0} modules</span>
              <span>{course.lessons_count || 0} lessons</span>
              <span>{course.duration} hours total length</span>
            </div>
            
            {course.modules && course.modules.length > 0 ? (
              <div className="modules-list">
                {course.modules.map(module => (
                  <div key={module.id} className="module-card">
                    <div 
                      className="module-header"
                      onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                    >
                      <h3>{module.title}</h3>
                      <span className="module-toggle">
                        {activeModule === module.id ? '▲' : '▼'}
                      </span>
                    </div>
                    
                    {activeModule === module.id && (
                      <div className="module-content">
                        {module.description && <p>{module.description}</p>}
                        
                        {module.lessons && module.lessons.length > 0 && (
                          <div className="lessons-list">
                            {module.lessons.map(lesson => (
                              <div key={lesson.id} className="lesson-item">
                                <div className="lesson-info">
                                  <span className="lesson-title">{lesson.title}</span>
                                  <span className="lesson-duration">{lesson.duration} min</span>
                                </div>
                                <div className="lesson-actions">
                                  {lesson.is_free && <span className="free-badge">Free Preview</span>}
                                  {(lesson.video_url || lesson.is_free) && (
                                    <button 
                                      className="preview-btn"
                                      onClick={() => handlePreview(lesson)}
                                    >
                                      Preview
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-content">
                <p>No content available yet.</p>
              </div>
            )}
          </div>

          <div className="course-sidebar">
            <div className="sidebar-card">
              <h3>What you'll learn</h3>
              <ul>
                {course.learning_objectives?.length > 0 ? (
                  course.learning_objectives.map((objective, index) => (
                    <li key={index}>✅ {objective}</li>
                  ))
                ) : (
                  <>
                    <li>✅ Comprehensive understanding of the subject</li>
                    <li>✅ Practical skills and applications</li>
                    <li>✅ Industry best practices</li>
                    <li>✅ Hands-on project experience</li>
                  </>
                )}
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Requirements</h3>
              <ul>
                {course.requirements?.length > 0 ? (
                  course.requirements.map((requirement, index) => (
                    <li key={index}>📋 {requirement}</li>
                  ))
                ) : (
                  <>
                    <li>📋 Basic computer skills</li>
                    <li>📋 Internet connection</li>
                    <li>📋 Willingness to learn</li>
                  </>
                )}
              </ul>
            </div>

            {/* Enrollment Stats */}
            <div className="sidebar-card">
              <h3>Course Stats</h3>
              <div className="course-stats">
                <div className="stat-item">
                  <span className="stat-label">Students enrolled:</span>
                  <span className="stat-value">{course.students_count || 0}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Duration:</span>
                  <span className="stat-value">{course.duration} hours</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Level:</span>
                  <span className="stat-value">{course.level}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Last updated:</span>
                  <span className="stat-value">
                    {course.updated_at ? new Date(course.updated_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="sidebar-card instructor-info">
              <h3>Instructor</h3>
              <div className="instructor-details">
                <div className="instructor-avatar">
                  {course.instructor_avatar ? (
                    <img src={course.instructor_avatar} alt={course.instructor} />
                  ) : (
                    <div className="avatar-placeholder">
                      {course.instructor?.charAt(0) || 'I'}
                    </div>
                  )}
                </div>
                <div className="instructor-text">
                  <h4>{course.instructor || 'Unknown Instructor'}</h4>
                  <p>{course.instructor_bio || 'Experienced instructor with industry knowledge.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;