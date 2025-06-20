import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_API || "http://localhost:8000/api",
});

export default api;
