import { Link } from "react-router-dom";

const Unauthorized = () => {
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
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            color: "#dc2626",
            marginBottom: "10px",
          }}
        >
          403
        </h1>

        <h2>Access Denied</h2>

        <p
          style={{
            margin: "20px 0",
            color: "#555",
          }}
        >
          You don't have permission to access this page.
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
            Go to Dashboard
          </Link>

          <Link to="/login" className="btn btn-danger">
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;