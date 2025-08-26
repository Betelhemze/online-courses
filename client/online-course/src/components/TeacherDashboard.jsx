import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalPosts: 0
  });
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    post_type: 'announcement',
    course: '',
    is_published: true
  });
  const [creatingPost, setCreatingPost] = useState(false);

  useEffect(() => {
    if (user && user.role === 'teacher') {
      fetchTeacherData();
    }
  }, [user]);

  const fetchTeacherData = async () => {
    try {
      // Fetch teacher's courses
      const coursesResponse = await axios.get('/api/courses/');
      const teacherCourses = coursesResponse.data; // API should filter by instructor
      setCourses(teacherCourses);

      // Fetch teacher's posts
      const postsResponse = await axios.get('/api/posts/my_posts/');
      setPosts(postsResponse.data);

      // Calculate simple stats
      setStats({
        totalCourses: teacherCourses.length,
        totalStudents: teacherCourses.reduce((total, course) => total + (course.students_count || 0), 0),
        totalPosts: postsResponse.data.length
      });

    } catch (error) {
      console.error('Error fetching teacher data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setCreatingPost(true);
    
    try {
      await axios.post('/api/posts/', newPost);
      
      // Reset form and hide it
      setNewPost({
        title: '',
        content: '',
        post_type: 'announcement',
        course: '',
        is_published: true
      });
      setShowPostForm(false);
      
      // Refresh posts data
      const postsResponse = await axios.get('/api/posts/my_posts/');
      setPosts(postsResponse.data);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalPosts: postsResponse.data.length
      }));
      
      alert('Post created successfully!');
      
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    } finally {
      setCreatingPost(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="teacher-dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading teacher dashboard...</p>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p>Welcome, {user?.first_name || user?.username}!</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{stats.totalCourses}</h3>
            <p>Total Courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>{stats.totalPosts}</h3>
            <p>Total Posts</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/create-course" className="action-btn primary">
            <span>📚</span>
            Create New Course
          </Link>
          <button 
            onClick={() => setShowPostForm(!showPostForm)}
            className="action-btn secondary"
          >
            <span>📝</span>
            {showPostForm ? 'Cancel' : 'Create New Post'}
          </button>
          <Link to="/courses" className="action-btn tertiary">
            <span>👀</span>
            View All Courses
          </Link>
        </div>
      </div>

      {/* Create Post Form */}
      {showPostForm && (
        <div className="post-form-container">
          <h3>Create New Post</h3>
          <form onSubmit={handleCreatePost} className="post-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                required
                placeholder="Enter post title"
              />
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="Write your post content here..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Post Type</label>
                <select
                  name="post_type"
                  value={newPost.post_type}
                  onChange={handleInputChange}
                >
                  <option value="announcement">Announcement</option>
                  <option value="lesson">Lesson</option>
                  <option value="assignment">Assignment</option>
                  <option value="resource">Resource</option>
                </select>
              </div>

              <div className="form-group">
                <label>Course *</label>
                <select
                  name="course"
                  value={newPost.course}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={newPost.is_published}
                  onChange={handleInputChange}
                />
                Publish immediately
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={creatingPost}
            >
              {creatingPost ? 'Creating Post...' : 'Create Post'}
            </button>
          </form>
        </div>
      )}

      {/* Recent Courses */}
      <div className="dashboard-section">
        <h2>Your Courses</h2>
        {courses.length === 0 ? (
          <div className="empty-state">
            <p>No courses yet. Create your first course!</p>
          </div>
        ) : (
          <div className="courses-list">
            {courses.slice(0, 3).map(course => (
              <div key={course.id} className="course-item">
                <h4>{course.title}</h4>
                <p>{course.students_count || 0} students enrolled</p>
                <Link to={`/courses/${course.id}`} className="btn btn-small">
                  View Course
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Posts */}
      <div className="dashboard-section">
        <h2>Recent Posts</h2>
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>No posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="posts-list">
            {posts.slice(0, 5).map(post => (
              <div key={post.id} className="post-item">
                <div className="post-header">
                  <span className="post-type">{post.post_type}</span>
                  <h4>{post.title}</h4>
                </div>
                <p className="post-content">
                  {post.content.length > 100 
                    ? post.content.substring(0, 100) + '...'
                    : post.content
                  }
                </p>
                <div className="post-meta">
                  <span>Course: {post.course_title}</span>
                  <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;