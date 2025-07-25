import axios from 'axios';

const api = axios.create({
  baseURL: 'https://notes-app-backend-li0h.onrender.com', // backend on Render
  headers: { 'Content-Type': 'application/json' }
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
