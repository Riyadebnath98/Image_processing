import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

// Helpers for auth
export const register = (username, password) =>
  api.post("/register", { username, password });

export const login = (username, password) =>
  api.post("/login", { username, password });

export const colorize = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await api.post("/colorize", formData, { responseType: "blob" });
  return res.data; // Blob
};

export default api;
