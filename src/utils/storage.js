const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const USER = "user";

// Save Access Token
export const saveAccessToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

// Get Access Token
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

// Remove Access Token
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

// Save Refresh Token
export const saveRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN, token);
};

// Get Refresh Token
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

// Remove Refresh Token
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};

// Save User
export const saveUser = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

// Get User
export const getUser = () => {
  const user = localStorage.getItem(USER);
  return user ? JSON.parse(user) : null;
};

// Remove User
export const removeUser = () => {
  localStorage.removeItem(USER);
};

// Clear All Authentication Data
export const clearStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(USER);
};

// Check if User is Logged In
export const isLoggedIn = () => {
  return !!getAccessToken();
};

// Default Export
export default {
  saveAccessToken,
  getAccessToken,
  removeAccessToken,
  saveRefreshToken,
  getRefreshToken,
  removeRefreshToken,
  saveUser,
  getUser,
  removeUser,
  clearStorage,
  isLoggedIn,
};