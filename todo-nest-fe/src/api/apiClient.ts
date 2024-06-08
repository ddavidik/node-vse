import axios from 'axios';
import { env } from '../env';

export const apiClient = axios.create({
  baseURL: env.VITE_PUBLIC_API_URL,
  responseType: 'json',
  withCredentials: true,
});
