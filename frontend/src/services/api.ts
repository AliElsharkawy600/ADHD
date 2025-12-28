import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // // الحل لمشكلة ngrok
    // "ngrok-skip-browser-warning": "true",
    // // الحل لمشكلة localtunnel
    // "Bypass-Tunnel-Reminder": "true",
  },
});

// Add authorization header if token exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
