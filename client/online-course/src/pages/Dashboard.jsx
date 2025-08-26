import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TeacherDashboard from '../components/TeacherDashboard';
import './Dashboard.css';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedLessons: 0,
    learningHours: 0,
    achievements: 0
  });
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'student') {
      fetchStudentDashboardData();
    }
    // Set dataLoading to false if user is a teacher or admin,
    // as they will use a different component
    if (user && (user.role === 'teacher' || user.role === 'admin')) {
      setDataLoading(false);
    }
  }, [user]);

  const fetchStudentDashboardData = async () => {
    try {
      // Fetch enrolled courses
      const coursesResponse = await axios.get('/api/courses/my_enrollments/');
      setEnrolledCourses(coursesResponse.data);

      // Fetch recent activity
      const activityResponse = await axios.get('/api/posts/recent_activity/');
      setRecentActivity(activityResponse.data);

      // Calculate stats (you can replace with actual API calls)
      const totalCourses = coursesResponse.data.length;
      const completedLessons = 23; 
      const learningHours = 47;
      const achievements = 3;

      setStats({ totalCourses, completedLessons, learningHours, achievements });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getActivityIcon = (postType) => {
    switch (postType) {
      case 'announcement': return '📢';
      case 'lesson': return '📚';
      case 'assignment': return '📝';
      case 'resource': return '📎';
      default: return '📄';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays < 7) return `${diffDays - 1} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (loading || (user && user.role === 'student' && dataLoading)) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-error">
        <h2>Please log in to access the dashboard</h2>
      </div>
    );
  }

  if (user.role === 'teacher' || user.role === 'admin') {
    return <TeacherDashboard />;
  }

  // Student Dashboard
  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.first_name || user?.username}!</h1>
          <p>Here's your learning dashboard</p>
        </div>
        
        <div className="dashboard-content">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <h3>Enrolled Courses</h3>
              <p className="stat-number">{stats.totalCourses}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <h3>Completed Lessons</h3>
              <p className="stat-number">{stats.completedLessons}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <h3>Learning Hours</h3>
              <p className="stat-number">{stats.learningHours}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <h3>Achievements</h3>
              <p className="stat-number">{stats.achievements}</p>
            </div>
          </div>
          
          <div className="dashboard-sections">
            {/* Enrolled Courses Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Your Enrolled Courses</h2>
                <Link to="/courses" className="view-all-link">View All Courses →</Link>
              </div>
              
              {enrolledCourses.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <h3>No courses yet</h3>
                  <p>Enroll in courses to start your learning journey</p>
                  <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                </div>
              ) : (
                <div className="courses-grid">
                  {enrolledCourses.slice(0, 4).map(course => (
                    <div key={course.id} className="course-card">
                      <div className="course-image">
                        {course.thumbnail ? (
                          <img src={course.thumbnail} alt={course.title} />
                        ) : (
                          <div className="course-image-placeholder">
                            {course.title.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="course-content">
                        <h4>{course.title}</h4>
                        <p className="course-instructor">By {course.instructor}</p>
                        <div className="course-meta">
                          <span className="course-level">{course.level}</span>
                          <span className="course-duration">{course.duration}h</span>
                        </div>
                        <Link to={`/courses/${course.id}`} className="btn btn-outline">
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity Section */}
            <div className="dashboard-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <span className="activity-count">{recentActivity.length} activities</span>
              </div>
              
              {recentActivity.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📊</div>
                  <h3>No activity yet</h3>
                  <p>Your recent activity will appear here</p>
                </div>
              ) : (
                <div className="activity-list">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <span className="activity-icon">
                        {getActivityIcon(activity.post_type)}
                      </span>
                      <div className="activity-content">
                        <div className="activity-title">
                          <span className="activity-type">{activity.post_type}</span>
                          <h4>{activity.title}</h4>
                        </div>
                        <p className="activity-description">
                          {activity.content.length > 100 
                            ? activity.content.substring(0, 100) + '...'
                            : activity.content
                          }
                        </p>
                        <div className="activity-meta">
                          <span className="activity-course">in {activity.course_title}</span>
                          <span className="activity-time">
                            {formatDate(activity.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;