// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.216.65.147/api/',
  //baseURL:'http://localhost:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;