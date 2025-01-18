import { useState } from 'react';

export default function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue ?? null));
        return defaultValue ?? null;
      }
    } catch {
      return defaultValue ?? null;
    }
  });

  const setValue = (newValue: T) => {
    try {
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch {
      setStoredValue(defaultValue ?? null);
      window.localStorage.setItem(key, JSON.stringify(defaultValue ?? null));
    }
  };

  return [storedValue, setValue];
}
