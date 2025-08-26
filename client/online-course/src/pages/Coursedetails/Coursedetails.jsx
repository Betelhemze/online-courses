import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from '../../context/AuthContext';
import './Coursedetails.css';

function Coursedetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/courses/${courseId}/`
        );
        setCourse(response.data);

        if (user) {
          setEnrolled(response.data.is_enrolled);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user) {
      alert("Please login to enroll in courses");
      navigate("/login");
      return;
    }

    setEnrolling(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/courses/${courseId}/enroll/`
      );

      if (response.status === 200 || response.status === 201) {
        setEnrolled(true);
        alert("Successfully enrolled!");
        navigate("/my-courses");
      }
    } catch (err) {
      console.error("Error enrolling:", err.response?.data);
      const msg =
        err.response?.data?.error || "Failed to enroll in this course";
      setError(msg);
      alert(msg);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="loading">Loading course details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="error">Course not found</div>;

  return (
    <div className="course-detail-page">

      {/* Title */}
      <section className="course-header">
        <h1>{course.title}</h1>
      </section>

      {/* Main Layout */}
      <div className="course-detail-container">
        {/* Left Column */}
        <div className="course-left">
          <div className="preview-video">
            {course.preview ? (
              <video width="100%" controls>
                <source src={course.preview} type="video/mp4" />
                Your browser does not support video tag.
              </video>
            ) : (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="course-thumbnail"
              />
            )}
          </div>

          <div className="course-description">
            <h2>About this course</h2>
            <p>{course.description}</p>

            <div className="enrollment-section">
              {user ? (
                enrolled ? (
                  <div className="enrollment-status">
                    <span className="enrolled-badge">✅ Already Enrolled</span>
                    <Link to="/my-courses" className="btn btn-success">
                      Go to My Courses
                    </Link>
                  </div>
                ) : (
                  <button
                    className="enroll-btn btn btn-primary"
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
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

        {/* Right Column */}
        <div className="course-right">
          <div className="now-playing">
            <h3>Now Playing</h3>
            <p>Introduction to {course.title}</p>
          </div>

          <div className="next-section">
            <h3>Next Section</h3>
            {course.modules && course.modules.length > 1 ? (
              <p>{course.modules[1].title}</p>
            ) : (
              <p>Coming soon...</p>
            )}
          </div>
        </div>
      </div>

      {/* Extra Info */}
      <div className="course-extra">
        <div className="course-info">
          <span>{course.contents || 0} Contents</span>
          <span> • </span>
          <span>{course.level}</span>
          <span> • </span>
          <span>{course.duration} hours</span>
        </div>

        {/* What you’ll learn */}
        <div className="what-you-learn">
          <h3>What you will learn</h3>
          <ul>
            {course.learn && course.learn.length > 0 ? (
              course.learn.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>No learning outcomes provided</li>
            )}
          </ul>
        </div>

        {/* Skills */}
        <div className="skills-gain">
          <h3>Skills you will gain</h3>
          <div className="skills-list">
            {course.skills && course.skills.length > 0 ? (
              course.skills.map((skill, idx) => <span key={idx}>{skill}</span>)
            ) : (
              <span>No skills listed</span>
            )}
          </div>
        </div>
      </div>

      {/* Recommended */}
      <section className="recommended">
        <h2>You may also like</h2>
        <div className="card-container">
          {course.recommended_courses &&
          course.recommended_courses.length > 0 ? (
            course.recommended_courses.map((rec) => (
              <div key={rec.id} className="card">
                <img className="card-img" src={rec.image} alt={rec.title} />
                <div className="card-content">
                  <h1>{rec.title}</h1>
                  <p>{rec.description}</p>
                  <Link to={`/courses/${rec.id}`} className="card-btn">
                    Learn More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No recommendations yet.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Coursedetails;
