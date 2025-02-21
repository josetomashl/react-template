import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

export default function useCookie(
  name: string,
  defaultValue?: string
): [string | null, (newValue: string | null, options?: Cookies.CookieAttributes) => void] {
  const [cookie, setCookie] = useState(() => {
    const cookie = Cookies.get(name);
    if (cookie) {
      return cookie;
    }
    if (defaultValue) {
      Cookies.set(name, defaultValue);
      return defaultValue;
    }
    return null;
  });

  const updateCookie = useCallback(
    (newValue: string | null, options?: Cookies.CookieAttributes) => {
      if (newValue) {
        Cookies.set(name, newValue, options);
      } else {
        Cookies.remove(name);
      }
      setCookie(newValue);
    },
    [name]
  );

  return [cookie, updateCookie];
}
