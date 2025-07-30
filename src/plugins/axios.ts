import axios from 'axios';
import Cookies from 'js-cookie';
import { CookieKeys } from './constants/cookies';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  responseEncoding: 'utf-8',
  responseType: 'json',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(CookieKeys.USER_TOKEN);
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
    return response.data;
  },
  (error) => {
    console.log('axios error', error);

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
        message = error.response.data.data;
        break;
      case 500:
      case 504:
        message = error.response;
        break;
    }
    throw new Error(message);
  }
);

export default axiosInstance;
