const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <a href="/" style={{ color: "#AF8FB0", textDecoration: "underline" }}>
        Go back Home
      </a>
    </div>
  );
};

export default NotFound;
