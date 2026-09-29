import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card"
        style={{
          textAlign: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "90px",
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          404
        </h1>

        <h2>Page Not Found</h2>

        <p
          style={{
            margin: "20px 0",
            color: "#555",
          }}
        >
          Sorry! The page you are looking for doesn't exist or has been moved.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          <Link to="/dashboard" className="btn">
            Dashboard
          </Link>

          <Link to="/login" className="btn btn-danger">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;