import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5067/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
