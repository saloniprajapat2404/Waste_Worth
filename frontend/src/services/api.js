import axios from 'axios';

const requestCache = new Map();
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:8080' : 'https://waste-worth.onrender.com');

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('w2w_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method === 'get' && config.url) {
      const cacheKey = `${config.url}?${JSON.stringify(config.params || {})}`;
      const cached = requestCache.get(cacheKey);
      if (cached) {
        return Promise.reject({
          __cachedResponse: cached,
          config,
        });
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    if (response.config.method === 'get' && response.config.url) {
      const cacheKey = `${response.config.url}?${JSON.stringify(response.config.params || {})}`;
      requestCache.set(cacheKey, response.data);
    }
    return response;
  },
  (error) => {
    if (error?.__cachedResponse) {
      return Promise.resolve({ data: error.__cachedResponse });
    }
    return Promise.reject(error);
  }
);

export default API;
