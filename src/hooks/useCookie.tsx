import { CookieKeys, type CookieKey } from '@/plugins/constants/cookies';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

export function useCookie<T = string>(
  name: CookieKey,
  defaultValue?: T
): [T | null, (newValue: T | null, options?: Cookies.CookieAttributes) => void] {
  const [cookie, setCookie] = useState<T | null>(() => {
    const cookieStr = Cookies.get(CookieKeys[name]);
    if (cookieStr) {
      try {
        return JSON.parse(cookieStr) as T;
      } catch {
        return defaultValue ?? null;
      }
    }
    if (defaultValue) {
      Cookies.set(CookieKeys[name], JSON.stringify(defaultValue));
      return defaultValue;
    }
    return null;
  });

  const updateCookie = useCallback(
    (newValue: T | null, options?: Cookies.CookieAttributes) => {
      if (newValue) {
        const newValueStr = typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
        Cookies.set(CookieKeys[name], newValueStr, options);
      } else {
        Cookies.remove(CookieKeys[name]);
      }
      setCookie(newValue);
    },
    [name]
  );

  return [cookie, updateCookie];
}
