import CookieKeys from '@/constants/CookieKeys';
import { useState } from 'react';
import useCookie from './useCookie';

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type SuccessFetchState<ResponseType> = {
  data: ResponseType;
  error: false;
};
type FailureFetchState = {
  data: string;
  error: true;
};

export default function useFetch<ResponseType, RequestBodyType = undefined>(
  url: string,
  method: Methods = 'GET',
  body?: RequestBodyType
) {
  const [token] = useCookie(CookieKeys.TOKEN);

  const [response, setResponse] = useState<ResponseType | string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function request(newUrl?: string): Promise<SuccessFetchState<ResponseType> | FailureFetchState> {
    try {
      let bodyRaw: string | null;
      if (body && method !== 'GET') {
        bodyRaw = JSON.stringify(body);
      } else {
        bodyRaw = null;
      }
      const response = await fetch(import.meta.env.VITE_SERVER_API + (newUrl ?? url), {
        cache: 'no-cache',
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: bodyRaw,
      });
      if (response.ok && response.status >= 200 && response.status <= 299) {
        const data = await response.json();
        setResponse(data);
        setIsLoading(false);
        setIsError(false);
        return { data: data, error: false } as SuccessFetchState<ResponseType>;
      } else {
        let error: object | string;
        try {
          error = await response.json();
        } catch {
          error = await response.text();
        }
        console.warn('Fetch error: ', typeof error === 'string' ? error : JSON.stringify(error));
        const res: FailureFetchState = {
          data: '',
          error: true,
        };
        switch (response.status) {
          case 400:
            res.data = 'Bad request';
            break;
          case 401:
          case 403:
            // TODO: handle logout & redirect
            res.data = 'Usuario no autorizado';
            break;
          case 404:
            res.data = 'Not found';
            break;
          case 500:
            res.data = 'Hay un problema con el servidor';
            break;
          default:
            res.data = 'An unexpected error has occurred';
            break;
        }
        setResponse(res.data);
        setIsError(true);
        setIsLoading(false);
        return res;
      }
    } catch (error) {
      console.warn('Fetch error: ', error);
      const res: FailureFetchState = {
        data: typeof error === 'string' ? error : 'An unexpected error has occurred',
        error: true,
      };
      setIsError(true);
      setIsLoading(false);
      setResponse(res.data);
      return res;
    }
  }

  return { response, isLoading, isError, request };
}
