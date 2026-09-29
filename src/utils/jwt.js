// Create a fake JWT token
export const generateJWT = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    iat: Date.now(),
    exp: Date.now() + 60 * 60 * 1000, // 1 Hour
  };

  return btoa(JSON.stringify(payload));
};

// Decode JWT token
export const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
};

// Check if token is expired
export const isJWTExpired = (token) => {
  const payload = decodeJWT(token);

  if (!payload) return true;

  return Date.now() > payload.exp;
};

// Get token expiry time
export const getTokenExpiry = (token) => {
  const payload = decodeJWT(token);

  return payload ? new Date(payload.exp) : null;
};

// Get remaining token time (milliseconds)
export const getRemainingTime = (token) => {
  const payload = decodeJWT(token);

  if (!payload) return 0;

  const remaining = payload.exp - Date.now();

  return remaining > 0 ? remaining : 0;
};

// Validate JWT token
export const validateJWT = (token) => {
  if (!token) return false;

  const payload = decodeJWT(token);

  if (!payload) return false;

  return !isJWTExpired(token);
};

// Get current user's role
export const getRoleFromToken = (token) => {
  const payload = decodeJWT(token);

  return payload?.role || null;
};

// Get current username
export const getUsernameFromToken = (token) => {
  const payload = decodeJWT(token);

  return payload?.username || null;
};

// Get current user ID
export const getUserIdFromToken = (token) => {
  const payload = decodeJWT(token);

  return payload?.id || null;
};

// Default export
export default {
  generateJWT,
  decodeJWT,
  isJWTExpired,
  getTokenExpiry,
  getRemainingTime,
  validateJWT,
  getRoleFromToken,
  getUsernameFromToken,
  getUserIdFromToken,
};