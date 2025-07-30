import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

export function useCookie<T = string>(
  name: string,
  defaultValue?: T
): [T | null, (newValue: T | null, options?: Cookies.CookieAttributes) => void] {
  const [cookie, setCookie] = useState<T | null>(() => {
    const cookieStr = Cookies.get(name);
    if (cookieStr) {
      try {
        const parsedValue = JSON.parse(cookieStr);
        return parsedValue as T;
      } catch {
        return cookieStr as T;
      }
    } else if (defaultValue) {
      Cookies.set(name, typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue));
      return defaultValue;
    }
    return null;
  });

  const updateCookie = useCallback(
    (newValue: T | null, options?: Cookies.CookieAttributes) => {
      if (newValue) {
        const parsedValue = typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
        Cookies.set(name, parsedValue, options);
        setCookie(parsedValue as T);
      } else {
        Cookies.remove(name);
        setCookie(null);
      }
    },
    [name]
  );

  return [cookie, updateCookie];
}
