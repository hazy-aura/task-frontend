import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_API || "https://task-backend-bmdu.onrender.com/api",
});

export default api;
