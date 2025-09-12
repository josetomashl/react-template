import axios from 'axios';
import Cookies from 'js-cookie';

import { CookieKeys } from '@/plugins/constants/cookies';
import { store } from '@/store';
import { pushNotification } from '@/store/modules/root';

export type BaseResponse<T = null> = {
  data: T;
  requestId: string;
  commons: {
    notifications_unread: number;
  };
};

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3000,
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
      config.headers.Authorization = `Bearer ${token}`;
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
    let message = '';
    switch (error.response.status) {
      case 400:
        // serverData.data = Object with error messages like: {email: ["Este valor no es una dirección de email válida."]}
        message =
          'Algo no ha ido como debería, revisa todos los campos e inténtalo de nuevo. Si el error persiste contacta con soporte.';
        break;
      case 401:
      case 403:
        message = 'Usuario no autorizado.';
        break;
      case 404:
        message = 'Recurso no disponible.';
        break;
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
