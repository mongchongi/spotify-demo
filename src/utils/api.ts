import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';

const api = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
});

export default api;
