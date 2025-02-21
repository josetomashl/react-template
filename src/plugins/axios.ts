import CookieKeys from '@/constants/CookieKeys';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  responseEncoding: 'utf-8',
  responseType: 'json',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(CookieKeys.TOKEN);
    if (token) {
      config.headers.Token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data ?? response;
  },
  (error) => {
    let message = 'An unexpected error has ocurred.';
    switch (error.response.status) {
      case 400:
        message = error.response.data;
        break;
      case 401:
      case 403:
        // TODO: redirect to logout
        break;
      case 404:
      case 418:
        message = error.response.data.message;
        break;
      case 500:
      case 504:
        message = error.response;
        break;
    }
    return Promise.reject(message);
  }
);

export default axiosInstance;
