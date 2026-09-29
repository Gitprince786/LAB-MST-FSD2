import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>RoleAuth App</h2>

      <ul>
        {!isAuthenticated ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            {user?.role === "Admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}

            {user?.role === "Editor" && (
              <li>
                <Link to="/editor">Editor</Link>
              </li>
            )}

            {user?.role === "Viewer" && (
              <li>
                <Link to="/viewer">Viewer</Link>
              </li>
            )}

            <li>
              <span>
                {user?.name} ({user?.role})
              </span>
            </li>

            <li>
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;