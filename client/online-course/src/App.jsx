import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import Login from './pages/Login';
import AboutUs from './components/AboutUs';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses/Course';
import NotFound from './pages/NotFound';
import TeacherDashboard from './components/TeacherDashboard';
import CreateCourse from './components/CreateCourse';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import CourseDetails from './pages/Coursedetails/Coursedetails';
import MyCourses from './components/MyCourses';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/my-courses" element={<MyCourses />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App
