import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostManager from "../components/PostManager";
import { getViewerData } from "../services/fakeBackend";

const Viewer = () => {
  const [permissions, setPermissions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getViewerData();

        setPermissions(data.permissions);
        setMessage(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Viewer Panel</h1>

        <p>{message}</p>

        <hr style={{ margin: "20px 0" }} />

        <h2>Viewer Permissions</h2>

        <ul style={{ marginTop: "20px", lineHeight: "2" }}>
          {permissions.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>

        <hr style={{ margin: "20px 0" }} />

        <PostManager />

        <hr style={{ margin: "20px 0" }} />

        <h2>Available Features</h2>

        <div
          style={{
            display: "grid",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <div className="card">
            <h3>📖 Read Articles</h3>
            <p>Browse and read all published articles.</p>
          </div>

          <div className="card">
            <h3>📰 View Posts</h3>
            <p>Access all available posts created by editors.</p>
          </div>

          <div className="card">
            <h3>👤 View Profile</h3>
            <p>View your account information and assigned role.</p>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link className="btn" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Viewer;