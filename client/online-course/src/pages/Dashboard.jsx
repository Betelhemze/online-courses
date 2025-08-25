import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.first_name || user?.username}!</h1>
          <p>Here's your learning dashboard</p>
        </div>
        
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <h3>Enrolled Courses</h3>
              <p className="stat-number">5</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <h3>Completed Lessons</h3>
              <p className="stat-number">23</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <h3>Learning Hours</h3>
              <p className="stat-number">47</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <h3>Achievements</h3>
              <p className="stat-number">3</p>
            </div>
          </div>
          
          <div className="dashboard-sections">
            <div className="recent-courses">
              <h2>Your Recent Courses</h2>
              <div className="courses-list">
                <div className="course-item">
                  <div className="course-item-info">
                    <h4>Introduction to Programming</h4>
                    <p>Progress: 65%</p>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div className="course-item">
                  <div className="course-item-info">
                    <h4>Web Development with React</h4>
                    <p>Progress: 42%</p>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '42%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">🎯</span>
                  <div className="activity-content">
                    <p>Completed lesson: React Components</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">📖</span>
                  <div className="activity-content">
                    <p>Started new course: Advanced JavaScript</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;