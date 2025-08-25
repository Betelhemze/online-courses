import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configure axios base URL
  axios.defaults.baseURL = 'http://localhost:8000';

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      getUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      console.log('Attempting login with:', username);
      
      const response = await axios.post('/api/auth/login/', {
        username,
        password
      });
      
      console.log('Login response:', response.data);
      
      // Save the token and user data
      const { access, user: userData } = response.data;
      setUser(userData);
      localStorage.setItem('token', access);
      setToken(access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      console.log('Login successful, user:', userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response?.data);
      
      let errorMessage = 'Login failed';
      if (error.response?.data) {
        if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (typeof error.response.data === 'object') {
          errorMessage = Object.values(error.response.data).flat().join(', ');
        }
      }
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration with:', userData);
      
      const response = await axios.post('/api/auth/register/', userData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Registration response:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      
      let errorMessage = 'Registration failed';
      if (error.response?.data) {
        // Handle different error formats
        if (typeof error.response.data === 'object') {
          if (error.response.data.username) {
            errorMessage = `Username: ${error.response.data.username.join(', ')}`;
          } else if (error.response.data.email) {
            errorMessage = `Email: ${error.response.data.email.join(', ')}`;
          } else if (error.response.data.password) {
            errorMessage = `Password: ${error.response.data.password.join(', ')}`;
          } else {
            errorMessage = Object.values(error.response.data).flat().join(', ');
          }
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      }
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('/api/users/profile/');
      setUser(response.data);
    } catch (error) {
      console.error('Error getting user profile:', error);
      if (error.response?.status === 404) {
        console.error('Profile endpoint not found. Please check Django URLs.');
      } else if (error.response?.status === 401) {
        console.error('Not authenticated. Please login again.');
      }
      logout();
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};