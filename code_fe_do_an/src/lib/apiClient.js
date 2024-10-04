// src/apiClient.js
import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:5000/';  // Replace with your backend API URL

// Create two separate Axios instances
const apiWithToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiWithoutToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for `apiWithToken` to automatically include the token
apiWithToken.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling for `apiWithToken`
apiWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized! Redirecting to login...');
      window.location.href = '/login';  // Redirect to login on 401 Unauthorized error
    }
    return Promise.reject(error);
  }
);

export { apiWithToken, apiWithoutToken };
