import { useEffect, useState } from "react";
import { decodeToken, isTokenExpired } from "../services/auth";

const TokenInfo = () => {
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decoded = decodeToken(token);

      if (decoded) {
        setTokenData({
          ...decoded,
          expired: isTokenExpired(token),
        });
      }
    }
  }, []);

  if (!tokenData) {
    return (
      <div className="card">
        <h3>Token Information</h3>
        <p>No access token found.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginTop: "20px" }}>
      <h3>JWT Token Information</h3>

      <table
        style={{
          width: "100%",
          marginTop: "15px",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <td><strong>User ID</strong></td>
            <td>{tokenData.id}</td>
          </tr>

          <tr>
            <td><strong>Username</strong></td>
            <td>{tokenData.username}</td>
          </tr>

          <tr>
            <td><strong>Role</strong></td>
            <td>{tokenData.role}</td>
          </tr>

          <tr>
            <td><strong>Expires</strong></td>
            <td>{new Date(tokenData.exp).toLocaleString()}</td>
          </tr>

          <tr>
            <td><strong>Status</strong></td>
            <td
              style={{
                color: tokenData.expired ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {tokenData.expired ? "Expired" : "Valid"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TokenInfo;