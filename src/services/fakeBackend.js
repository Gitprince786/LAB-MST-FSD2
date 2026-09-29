const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin",
    name: "Administrator",
    email: "admin@example.com",
  },
  {
    id: 2,
    username: "editor",
    password: "editor123",
    role: "Editor",
    name: "Editor User",
    email: "editor@example.com",
  },
  {
    id: 3,
    username: "viewer",
    password: "viewer123",
    role: "Viewer",
    name: "Viewer User",
    email: "viewer@example.com",
  },
];

const delay = (ms = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Login
export const fakeLogin = async (username, password) => {
  await delay();

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  return {
    success: true,
    data: {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      email: user.email,
    },
  };
};

// Get All Users (Admin Only)
export const getUsers = async () => {
  await delay();

  return {
    success: true,
    data: users.map(({ password, ...user }) => user),
  };
};

// Dashboard Data
export const getDashboardData = async () => {
  await delay();

  return {
    success: true,
    data: {
      totalUsers: users.length,
      totalAdmins: users.filter((u) => u.role === "Admin").length,
      totalEditors: users.filter((u) => u.role === "Editor").length,
      totalViewers: users.filter((u) => u.role === "Viewer").length,
    },
  };
};

// Admin Data
export const getAdminData = async () => {
  await delay();

  return {
    success: true,
    message: "Welcome Admin",
    permissions: [
      "Create Users",
      "Delete Users",
      "Update Users",
      "View Reports",
      "Manage Roles",
    ],
  };
};

// Editor Data
export const getEditorData = async () => {
  await delay();

  return {
    success: true,
    message: "Welcome Editor",
    permissions: [
      "Create Posts",
      "Edit Posts",
      "Delete Own Posts",
    ],
  };
};

// Viewer Data
export const getViewerData = async () => {
  await delay();

  return {
    success: true,
    message: "Welcome Viewer",
    permissions: [
      "View Posts",
      "Read Articles",
    ],
  };
};

// Logout
export const fakeLogout = async () => {
  await delay(300);

  return {
    success: true,
    message: "Logged out successfully",
  };
};

export default {
  fakeLogin,
  getUsers,
  getDashboardData,
  getAdminData,
  getEditorData,
  getViewerData,
  fakeLogout,
};