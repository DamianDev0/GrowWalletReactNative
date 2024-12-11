import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.88.123:4000/growWallet/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
