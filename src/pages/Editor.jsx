import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostManager from "../components/PostManager";
import { getEditorData } from "../services/fakeBackend";

const Editor = () => {
  const [permissions, setPermissions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEditorData();

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

        <h1>Editor Panel</h1>

        <p>{message}</p>

        <hr style={{ margin: "20px 0" }} />

        <h2>Editor Permissions</h2>

        <ul style={{ marginTop: "20px", lineHeight: "2" }}>
          {permissions.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>

        <hr style={{ margin: "20px 0" }} />

        <PostManager />

        <hr style={{ margin: "20px 0" }} />

        <h2>Editor Responsibilities</h2>

        <div
          style={{
            marginTop: "15px",
            display: "grid",
            gap: "15px",
          }}
        >
          <div className="card">
            <h3>Create Content</h3>
            <p>Create new articles, blogs, and posts.</p>
          </div>

          <div className="card">
            <h3>Edit Existing Content</h3>
            <p>Modify and improve previously published content.</p>
          </div>

          <div className="card">
            <h3>Delete Own Posts</h3>
            <p>Editors can remove only the content they have created.</p>
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

export default Editor;