import axios from 'axios';

const api = axios.create({
  baseURL:  "https://task-backend-bmdu.onrender.com/api" ,
});

export default api;
