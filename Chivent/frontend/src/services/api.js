// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // if you’ve set up CRA’s proxy to http://127.0.0.1:8000, you can just do:
  baseURL: '/api/',
  
  // Otherwise:
  // baseURL: 'http://127.0.0.1:8000/api/',
  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;