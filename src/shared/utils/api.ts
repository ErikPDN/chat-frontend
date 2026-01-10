import axios from "axios";
import { useAuthStore } from "../../features/auth/stores/useAuthStore";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

export default api;
