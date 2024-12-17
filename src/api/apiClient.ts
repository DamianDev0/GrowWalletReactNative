import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://developed-gilberte-joji-d9d28067.koyeb.app/growWallet/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
