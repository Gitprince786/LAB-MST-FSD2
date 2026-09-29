import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutButton = ({
  className = "btn btn-danger",
  children = "Logout",
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleLogout}
    >
      {children}
    </button>
  );
};

export default LogoutButton;