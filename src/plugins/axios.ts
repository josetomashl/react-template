import { store } from '@/store';
import { pushNotification } from '@/store/modules/root';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CookieKeys } from './constants/cookies';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  responseEncoding: 'utf-8',
  responseType: 'json'
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
    const serverData = error.response.data;
    let message = 'An unexpected error has ocurred.';
    switch (error.response.status) {
      case 400:
        // serverData.data = Object with error messages like: {email: ["Este valor no es una dirección de email válida."]}
        message = 'Petición no válida. Revisa todos los campos e inténtalo de nuevo.';
        break;
      case 401:
      case 403:
      case 404:
      case 418:
        message = serverData.data.message;
        break;
      case 500:
        // message = serverData.error;
        message = 'Servicio no disponible en estos momentos. Por favor, inténtalo de nuevo más tarde.';
        break;
    }
    store.dispatch(pushNotification({ type: 'error', message }));
    throw new Error(message);
  }
);

export default axiosInstance;
