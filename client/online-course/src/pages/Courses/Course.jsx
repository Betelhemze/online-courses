import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./course.css";
import defaultCourse from '../../assets/default-course.jpg'

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    price: [],
    level: [],
    subject: [],
    duration: []
  });
  const [sortBy, setSortBy] = useState("newest");

  // ✅ helper function to keep courses unique
  const uniqueById = (arr) =>
    arr.filter((course, index, self) =>
      index === self.findIndex(c => c.id === course.id)
    );

  const location = useLocation(); // used to re-fetch when navigating back

  // ✅ fetch courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/courses/");
      const uniqueCourses = uniqueById(response.data);
      setCourses(uniqueCourses);
      setFilteredCourses(uniqueCourses);
    } catch (err) {
      setError("Failed to fetch courses");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // fetch on first mount + when route changes
  useEffect(() => {
    fetchCourses();
  }, [location.pathname]);

  // Apply filters and search
  useEffect(() => {
    let result = [...courses];

    // search
    if (searchQuery) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // price
    if (filters.price.length > 0) {
      if (filters.price.includes("free")) {
        result = result.filter(course => course.price === 0 || course.price === "0.00");
      }
      if (filters.price.includes("paid")) {
        result = result.filter(course => course.price > 0);
      }
    }

    // level
    if (filters.level.length > 0) {
      result = result.filter(course => filters.level.includes(course.level));
    }

    // sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "popular":
        result.sort((a, b) => (b.students_count || 0) - (a.students_count || 0));
        break;
      case "price-low":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    setFilteredCourses(uniqueById(result)); // ✅ keep unique when filtering
  }, [courses, filters, searchQuery, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
      return newFilters;
    });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      // handled by useEffect
    }
  };

  const clearFilters = () => {
    setFilters({
      price: [],
      level: [],
      subject: [],
      duration: []
    });
    setSearchQuery("");
  };

  if (loading) return <div className="courses-loading">Loading courses...</div>;
  if (error) return <div className="courses-error">{error}</div>;

  return (
    <div className="courses-page">
      <Navbar />

      {/* Hero Section */}
      <section className="courses-hero">
        <div className="hero-content">
          <h1>Expand Your Knowledge</h1>
          <p>Discover courses taught by industry experts and advance your career</p>

          <div className="search-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search courses by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
              />
              <button onClick={handleSearch}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <h3>{courses.length}+</h3>
              <p>Courses</p>
            </div>
            <div className="stat">
              <h3>{courses.reduce((acc, course) => acc + (course.students_count || 0), 0)}+</h3>
              <p>Students</p>
            </div>
            <div className="stat">
              <h3>{new Set(courses.map(course => course.instructor)).size}+</h3>
              <p>Instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="courses-container">
        {/* Filters Sidebar */}
        <aside className="filter-section">
          <div className="filter-header">
            <h3>Filters</h3>
            <button onClick={clearFilters} className="clear-filters">
              Clear All
            </button>
          </div>

          <div className="filter-group">
            <h4>Price</h4>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.price.includes("free")}
                onChange={() => handleFilterChange("price", "free")}
              />
              <span className="checkmark"></span>
              Free
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.price.includes("paid")}
                onChange={() => handleFilterChange("price", "paid")}
              />
              <span className="checkmark"></span>
              Paid
            </label>
          </div>

          <div className="filter-group">
            <h4>Level</h4>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.level.includes("beginner")}
                onChange={() => handleFilterChange("level", "beginner")}
              />
              <span className="checkmark"></span>
              Beginner
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.level.includes("intermediate")}
                onChange={() => handleFilterChange("level", "intermediate")}
              />
              <span className="checkmark"></span>
              Intermediate
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.level.includes("advanced")}
                onChange={() => handleFilterChange("level", "advanced")}
              />
              <span className="checkmark"></span>
              Advanced
            </label>
          </div>

          <div className="filter-group">
            <h4>Duration (hours)</h4>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.duration.includes("short")}
                onChange={() => handleFilterChange("duration", "short")}
              />
              <span className="checkmark"></span>
              Less than 2h
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.duration.includes("medium")}
                onChange={() => handleFilterChange("duration", "medium")}
              />
              <span className="checkmark"></span>
              2 - 5h
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.duration.includes("long")}
                onChange={() => handleFilterChange("duration", "long")}
              />
              <span className="checkmark"></span>
              5 - 10h
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.duration.includes("extended")}
                onChange={() => handleFilterChange("duration", "extended")}
              />
              <span className="checkmark"></span>
              10h+
            </label>
          </div>
        </aside>

        {/* Courses Grid */}
        <main className="courses-main">
          <div className="courses-header">
            <h2>All Courses <span>({filteredCourses.length})</span></h2>

            <div className="sorting-controls">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="no-courses">
              <i className="fas fa-search"></i>
              <h3>No courses found</h3>
              <p>Try adjusting your search or filters</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-image">
                    <img
                      src={course.thumbnail || defaultCourse}
                      alt={course.title}
                    />
                    <div className="course-level">{course.level}</div>
                    {course.price > 0 ? (
                      <div className="course-price">${course.price}</div>
                    ) : (
                      <div className="course-price free">Free</div>
                    )}
                  </div>

                  <div className="course-content">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">
                      {course.description.length > 100
                        ? `${course.description.substring(0, 100)}...`
                        : course.description}
                    </p>

                    <div className="course-meta">
                      <div className="meta-item">
                        <i className="fas fa-clock"></i>
                        <span>{course.duration} hours</span>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-users"></i>
                        <span>{course.students_count || 0} students</span>
                      </div>
                    </div>

                    <div className="course-instructor">
                      <div className="instructor-avatar">
                        <img
                          src="/assets/instructor.png"
                          alt={course.instructor}
                        />
                      </div>
                      <span>{course.instructor || "Unknown Instructor"}</span>
                    </div>
                  </div>

                  <div className="course-actions">
                    <Link to={`/courses/${course.id}`} className="btn-primary">
                      View Course
                    </Link>
                    <div className="action-buttons">
                      <button className="icon-btn" title="Add to favorites">
                        <i className="far fa-heart"></i>
                      </button>
                      <button className="icon-btn" title="Share">
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Course;
