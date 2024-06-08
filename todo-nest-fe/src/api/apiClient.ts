import axios from 'axios';
import { env } from '../env';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: env.VITE_PUBLIC_API_URL,
  responseType: 'json',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('jwt');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { apiClient };
