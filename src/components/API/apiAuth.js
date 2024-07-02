import axios from 'axios';


export const api = axios.create({
  baseURL: 'https://wallet.b.goit.study/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
