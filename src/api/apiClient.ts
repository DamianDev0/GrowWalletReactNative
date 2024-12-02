import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://obliged-nanice-jojithebest-b4bde1f9.koyeb.app/growWallet/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
