import React from 'react';
import { useAuth } from '../context/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome, {user?.first_name || user?.username}!</p>
      </div>

      <div className="dashboard-content">
        <div className="welcome-message">
          <h2>🎓 Ready to learn?</h2>
          <p>Explore courses, track your progress, and continue your learning journey.</p>
        </div>

        <div className="quick-links">
          <h3>Quick Links</h3>
          <div className="link-buttons">
            <a href="/courses" className="link-btn">Browse Courses</a>
            <a href="/dashboard" className="link-btn">My Progress</a>
            <a href="/profile" className="link-btn">My Profile</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;