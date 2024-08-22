// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-backend-api.com', // Replace with your actual API base URL
  timeout: 10000, // You can adjust the timeout value as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
