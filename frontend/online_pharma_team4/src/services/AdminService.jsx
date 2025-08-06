// src/services/AdminService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/admin";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getAllUsers = () =>
  axios.get(`${API_BASE_URL}/users`, { headers: getAuthHeaders() });

export const createUser = (userData) =>
  axios.post(`${API_BASE_URL}/user`, userData, { headers: getAuthHeaders() });

export const updateUserById = (id, userData) =>
  axios.put(`${API_BASE_URL}/users/${id}`, userData, {
    headers: getAuthHeaders(),
  });

export const deleteUserById = (id) =>
  axios.delete(`${API_BASE_URL}/users/${id}`, { headers: getAuthHeaders() });

export const disableUserById = (id) =>
  axios.put(`${API_BASE_URL}/users/${id}/disable`, null, {
    headers: getAuthHeaders(),
  });

export const getAllDrugs = () =>
  axios.get(`${API_BASE_URL}/drug-items/all`, { headers: getAuthHeaders() });

export const addDrug = (drugData) =>
  axios.post(`${API_BASE_URL}/drug-items`, drugData, {
    headers: getAuthHeaders(),
  });

export const updateDrug = (id, updatedDrug) =>
  axios.put(`${API_BASE_URL}/drug-items/${id}`, updatedDrug, {
    headers: getAuthHeaders(),
  });

export const banUnbanDrug = (id, banned) =>
  axios.put(`${API_BASE_URL}/drug-items/${id}/ban`, null, {
    params: { banned },
    headers: getAuthHeaders(),
  });
export const updateAdminProfile = (profileData) =>
  axios.put(`${API_BASE_URL}/profile`, profileData, {
    headers: getAuthHeaders(),
  });
export const deleteDrugById = (id) =>
  axios.delete(`${API_BASE_URL}/drugs/${id}`, { headers: getAuthHeaders() });
