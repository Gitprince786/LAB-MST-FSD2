import axios from "axios";
import { refreshAccessToken, isTokenExpired } from "./auth";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken");

    if (token) {
      // Refresh token if expired
      if (isTokenExpired(token)) {
        const newToken = await refreshAccessToken();

        if (newToken) {
          localStorage.setItem("accessToken", newToken);
          token = newToken;
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(new Error("Session expired"));
        }
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert("Unauthorized! Please login again.");
          window.location.href = "/login";
          break;

        case 403:
          alert("Access Denied.");
          break;

        case 404:
          console.log("Requested resource not found.");
          break;

        case 500:
          console.log("Internal Server Error.");
          break;

        default:
          console.log(error.response.data);
      }
    } else if (error.request) {
      console.log("Network Error");
    } else {
      console.log(error.message);
    }

    return Promise.reject(error);
  }
);

// GET Request
export const getData = async (url) => {
  const response = await api.get(url);
  return response.data;
};

// POST Request
export const postData = async (url, data) => {
  const response = await api.post(url, data);
  return response.data;
};

// PUT Request
export const putData = async (url, data) => {
  const response = await api.put(url, data);
  return response.data;
};

// DELETE Request
export const deleteData = async (url) => {
  const response = await api.delete(url);
  return response.data;
};

export default api;