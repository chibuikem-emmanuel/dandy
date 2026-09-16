// lib/api.ts
import axios, { InternalAxiosRequestConfig } from 'axios';

// Get base URL from environment or fallback to Render/Local
const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://dandy-bk.onrender.com/api';

// Normalize trailing slash to prevent double slashes (e.g., //api)
const baseURL = rawBaseUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15s timeout to handle initial Render free-tier cold starts
});

// Attach Authorization Token to Requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;