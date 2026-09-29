// Role-wise permissions
export const PERMISSIONS = {
  Admin: [
    "CREATE_USER",
    "UPDATE_USER",
    "DELETE_USER",
    "VIEW_USERS",
    "MANAGE_ROLES",
    "VIEW_REPORTS",
    "CREATE_POST",
    "EDIT_POST",
    "DELETE_POST",
  ],

  Editor: [
    "CREATE_POST",
    "EDIT_POST",
    "DELETE_OWN_POST",
    "VIEW_POSTS",
  ],

  Viewer: [
    "VIEW_POSTS",
    "READ_ARTICLES",
  ],
};

// Check if a role has a specific permission
export const hasPermission = (role, permission) => {
  if (!role || !permission) return false;

  return PERMISSIONS[role]?.includes(permission);
};

// Get all permissions of a role
export const getPermissions = (role) => {
  return PERMISSIONS[role] || [];
};

// Check if role is Admin
export const isAdmin = (role) => role === "Admin";

// Check if role is Editor
export const isEditor = (role) => role === "Editor";

// Check if role is Viewer
export const isViewer = (role) => role === "Viewer";

// Check multiple roles
export const hasRole = (role, allowedRoles = []) => {
  return allowedRoles.includes(role);
};

// Check if user can edit content
export const canEditContent = (role) => {
  return hasPermission(role, "EDIT_POST");
};

// Check if user can create content
export const canCreateContent = (role) => {
  return hasPermission(role, "CREATE_POST");
};

// Check if user can delete content
export const canDeleteContent = (role) => {
  return (
    hasPermission(role, "DELETE_POST") ||
    hasPermission(role, "DELETE_OWN_POST")
  );
};

// Check if user can manage users
export const canManageUsers = (role) => {
  return hasPermission(role, "MANAGE_ROLES");
};

// Check if user can view reports
export const canViewReports = (role) => {
  return hasPermission(role, "VIEW_REPORTS");
};

// Default export
export default {
  PERMISSIONS,
  hasPermission,
  getPermissions,
  isAdmin,
  isEditor,
  isViewer,
  hasRole,
  canEditContent,
  canCreateContent,
  canDeleteContent,
  canManageUsers,
  canViewReports,
};