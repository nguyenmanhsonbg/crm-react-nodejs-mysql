// src/services/authService.js
import apiClient from '../api/apiClient';

const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;  // Return the created user data
};

const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  localStorage.setItem('authToken', response.data.token);  // Store token
  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem('authToken');  // Remove token from storage
  window.location.href = '/login';  // Redirect to login
};

export { registerUser, loginUser, logoutUser };
