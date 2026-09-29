import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

const seedPosts = [
  {
    id: 1,
    title: "Product Launch Update",
    body: "The team is preparing the next major release and planning the customer rollout.",
    category: "Announcements",
    author: "Editor User",
    role: "Editor",
    createdAt: "2026-08-10",
    likes: 12,
    comments: ["Excited to learn more.", "Great progress."],
  },
  {
    id: 2,
    title: "Security Policy Refresh",
    body: "We are reviewing the audit log and improving access control for all internal systems.",
    category: "Security",
    author: "Administrator",
    role: "Admin",
    createdAt: "2026-08-09",
    likes: 4,
    comments: ["Thank you for the visibility."],
  },
  {
    id: 3,
    title: "Editorial Workflow Review",
    body: "Our editorial team has completed the review checklist and approved a new publishing cycle.",
    category: "Editorial",
    author: "Editor User",
    role: "Editor",
    createdAt: "2026-08-08",
    likes: 10,
    comments: ["Looks good for the next release."],
  },
  {
    id: 4,
    title: "Quarterly Admin Meeting",
    body: "The admin group is reviewing permissions, tool adoption, and support readiness for the next quarter.",
    category: "Admin",
    author: "Administrator",
    role: "Admin",
    createdAt: "2026-08-07",
    likes: 6,
    comments: ["Thanks for sharing the agenda."],
  },
  {
    id: 5,
    title: "Content Quality Standards",
    body: "All authors should follow the quality checklist before publishing new content to the portal.",
    category: "Guidelines",
    author: "Editor User",
    role: "Editor",
    createdAt: "2026-08-06",
    likes: 8,
    comments: ["This will help reduce review time."],
  },
];

const PostManager = () => {
  const { user } = useAuth();
  const currentRole = user?.role;

  const [posts, setPosts] = useState(seedPosts);
  const [draft, setDraft] = useState({ title: "", body: "", category: "General" });
  const [editingId, setEditingId] = useState(null);
  const [newComment, setNewComment] = useState({});

  const canCreate = currentRole === "Admin" || currentRole === "Editor";
  const canEdit = currentRole === "Admin" || currentRole === "Editor";
  const canDelete = currentRole === "Admin" || currentRole === "Editor";
  const canRead = currentRole === "Admin" || currentRole === "Editor" || currentRole === "Viewer";

  const canEditPost = (post) => {
    return currentRole === "Admin" || (currentRole === "Editor" && post.author === user?.name);
  };

  const canDeletePost = (post) => {
    return currentRole === "Admin" || (currentRole === "Editor" && post.author === user?.name);
  };

  const roleLabel = useMemo(() => {
    return currentRole || "Guest";
  }, [currentRole]);

  const addPost = (event) => {
    event.preventDefault();

    if (!draft.title.trim() || !draft.body.trim()) {
      return;
    }

    if (editingId) {
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === editingId
            ? {
                ...post,
                title: draft.title,
                body: draft.body,
                category: draft.category,
              }
            : post
        )
      );
    } else {
      const newPost = {
        id: Date.now(),
        title: draft.title,
        body: draft.body,
        category: draft.category,
        author: user?.name || "Editor User",
        role: user?.role || "Editor",
        createdAt: new Date().toISOString().slice(0, 10),
        likes: 0,
        comments: [],
      };

      setPosts((currentPosts) => [newPost, ...currentPosts]);
    }

    setDraft({ title: "", body: "", category: "General" });
    setEditingId(null);
  };

  const startEditing = (post) => {
    setEditingId(post.id);
    setDraft({ title: post.title, body: post.body, category: post.category });
  };

  const deletePost = (postId) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
  };

  const likePost = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const addComment = (postId) => {
    const comment = newComment[postId]?.trim();

    if (!comment) {
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );

    setNewComment((current) => ({ ...current, [postId]: "" }));
  };

  return (
    <section className="post-manager">
      <div className="post-header">
        <div>
          <span className="eyebrow">{roleLabel} Workspace</span>
          <h1>Post Feed</h1>
        </div>
        <div className="post-count">{posts.length} posts</div>
      </div>

      {canCreate && (
        <div className="composer-panel">
          <div className="composer-title">
            <h2>{editingId ? "Edit Post" : "Create Post"}</h2>
          </div>

          <form className="post-form" onSubmit={addPost}>
            <input
              type="text"
              className="post-input"
              placeholder="Post title"
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              required
            />

            <textarea
              className="post-input"
              placeholder="Write something..."
              value={draft.body}
              onChange={(event) => setDraft({ ...draft, body: event.target.value })}
              required
            />

            <select
              className="post-input"
              value={draft.category}
              onChange={(event) => setDraft({ ...draft, category: event.target.value })}
            >
              <option value="General">General</option>
              <option value="Announcements">Announcements</option>
              <option value="Security">Security</option>
              <option value="Insights">Insights</option>
            </select>

            <div className="form-actions">
              <button className="btn" type="submit">
                {editingId ? "Update" : "Publish"}
              </button>

              {editingId && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setDraft({ title: "", body: "", category: "General" });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="post-list">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-card-head">
              <div>
                <span className="category">{post.category}</span>
                <h3>{post.title}</h3>
              </div>

              <div className="post-role-badge">
                <span className={`badge ${post.role?.toLowerCase()}`}>{post.role}</span>
              </div>
            </div>

            <p className="post-body">{post.body}</p>

            <div className="post-meta">
              <span>By {post.author}</span>
              <span>{post.createdAt}</span>
            </div>

            <div className="post-action-row">
              <button className="text-button" onClick={() => likePost(post.id)}>
                ♥ {post.likes}
              </button>

              {canEdit && canEditPost(post) && (
                <button className="text-button" onClick={() => startEditing(post)}>
                  Edit
                </button>
              )}

              {canDelete && canDeletePost(post) && (
                <button className="text-button danger-text" onClick={() => deletePost(post.id)}>
                  Delete
                </button>
              )}
            </div>

            <div className="comment-section">
              <div className="comment-list">
                {post.comments?.length > 0 ? (
                  <ul>
                    {post.comments.map((comment, index) => (
                      <li key={`${post.id}-${index}`}>{comment}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="muted-text">No comments yet</p>
                )}
              </div>

              {canRead && (
                <div className="comment-form">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={newComment[post.id] || ""}
                    onChange={(event) =>
                      setNewComment((current) => ({
                        ...current,
                        [post.id]: event.target.value,
                      }))
                    }
                  />
                  <button className="btn btn-small" onClick={() => addComment(post.id)}>
                    Comment
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PostManager;
