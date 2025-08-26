import React, { useEffect, useState } from "react";

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(storedCourses);
  }, []);

  return (
    <div className="my-courses">
      <h2>My Courses</h2>
      <div className="card-container">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div key={course.id} className="card">
              <img className="card-img" src={course.image} alt={course.title} />
              <div className="card-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>You haven’t enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;