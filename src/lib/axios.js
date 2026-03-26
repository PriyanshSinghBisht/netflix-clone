import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_TMDB_API_AUTH;
  config.headers.Authorization = `Bearer ${apiKey}`;
  return config;
});

export default api;