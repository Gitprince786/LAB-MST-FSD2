const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin",
    name: "Administrator",
  },
  {
    id: 2,
    username: "editor",
    password: "editor123",
    role: "Editor",
    name: "Editor User",
  },
  {
    id: 3,
    username: "viewer",
    password: "viewer123",
    role: "Viewer",
    name: "Viewer User",
  },
];

// Generate Fake JWT Token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + 60 * 60 * 1000,
  };

  return btoa(JSON.stringify(payload));
};

// Generate Fake Refresh Token
const generateRefreshToken = () => {
  return (
    "refresh_" +
    Math.random().toString(36).substring(2) +
    Date.now()
  );
};

// Login Function
export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) =>
          u.username === username &&
          u.password === password
      );

      if (!user) {
        reject(new Error("Invalid username or password"));
        return;
      }

      resolve({
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name,
        },
        token: generateToken(user),
        refreshToken: generateRefreshToken(),
      });
    }, 1000);
  });
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Refresh Token
export const refreshAccessToken = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        resolve(null);
        return;
      }

      resolve(generateToken(user));
    }, 500);
  });
};

// Decode Token
export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

// Check Token Expiry
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);

  if (!decoded) return true;

  return decoded.exp < Date.now();
};

// Get Current User
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};