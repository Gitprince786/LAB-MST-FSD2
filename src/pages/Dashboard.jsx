import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostManager from "../components/PostManager";
import { useAuth } from "../context/AuthContext";
import { getDashboardData } from "../services/fakeBackend";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalEditors: 0,
    totalViewers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard container">
      <div className="card">

        <h1>Dashboard</h1>

        <p>
          <strong>Welcome:</strong> {user?.name}
        </p>

        <p>
          <strong>Username:</strong> {user?.username}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          <span className={`badge ${user?.role?.toLowerCase()}`}>
            {user?.role}
          </span>
        </p>

        <hr style={{ margin: "20px 0" }} />

        <h2>System Statistics</h2>

        <ul style={{ marginTop: "15px", lineHeight: "2" }}>
          <li>Total Users : {stats.totalUsers}</li>
          <li>Total Admins : {stats.totalAdmins}</li>
          <li>Total Editors : {stats.totalEditors}</li>
          <li>Total Viewers : {stats.totalViewers}</li>
        </ul>

        <hr style={{ margin: "20px 0" }} />

        <h2>Quick Navigation</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {user?.role === "Admin" && (
            <Link className="btn" to="/admin">
              Admin Panel
            </Link>
          )}

          {user?.role === "Editor" && (
            <Link className="btn" to="/editor">
              Editor Panel
            </Link>
          )}

          {user?.role === "Viewer" && (
            <Link className="btn" to="/viewer">
              Viewer Panel
            </Link>
          )}

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <hr style={{ margin: "30px 0 20px" }} />

        <PostManager />

      </div>
    </div>
  );
};

export default Dashboard;