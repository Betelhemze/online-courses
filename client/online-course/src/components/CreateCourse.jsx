import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './CreateCourse.css';

const CreateCourse = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner',
    duration: 0,
    price: 0.00,
    is_published: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/courses/', formData);
      setSuccess('Course created successfully!');
      setFormData({
        title: '',
        description: '',
        level: 'beginner',
        duration: 0,
        price: 0.00,
        is_published: false
      });
      console.log('Course created:', response.data);
    } catch (error) {
      console.error('Error creating course:', error.response?.data);
      setError(error.response?.data?.error || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'teacher' && user?.role !== 'admin') {
    return (
      <div className="create-course">
        <h2>Access Denied</h2>
        <p>Only teachers and administrators can create courses.</p>
      </div>
    );
  }

  return (
    <div className="create-course">
      <h2>Create New Course</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label>Course Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter course title"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe your course"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label>Duration (hours)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="0"
              placeholder="Course duration"
            />
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
            />
            Publish course immediately
          </label>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating Course...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;