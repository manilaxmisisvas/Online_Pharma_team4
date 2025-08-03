import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);
  localStorage.setItem("email", res.data.email);
  return res.data; // Returns { token, role, email }
};

export const register = async (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};