import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostManager from "../components/PostManager";
import { getAdminData, getUsers } from "../services/fakeBackend";

const Admin = () => {
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminData = await getAdminData();
        const userData = await getUsers();

        setPermissions(adminData.permissions);
        setMessage(adminData.message);
        setUsers(userData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="card">

        <h1>Admin Panel</h1>

        <p>{message}</p>

        <hr style={{ margin: "20px 0" }} />

        <h2>Admin Permissions</h2>

        <ul style={{ marginTop: "15px", lineHeight: "2" }}>
          {permissions.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>

        <hr style={{ margin: "20px 0" }} />

        <PostManager />

        <hr style={{ margin: "20px 0" }} />

        <h2>Registered Users</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#2563eb", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                ID
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Name
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Username
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                Role
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.id}
                </td>

                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.name}
                </td>

                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.username}
                </td>

                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {user.email}
                </td>

                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  <span className={`badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "30px" }}>
          <Link className="btn" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Admin;