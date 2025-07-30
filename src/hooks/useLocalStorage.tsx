import { useState } from 'react';

export function useLocalStorage<T = string>(key: string, defaultValue?: T): [T | null, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    const value = window.localStorage.getItem(key);
    if (value) {
      try {
        const parsedValue = JSON.parse(value);
        return parsedValue;
      } catch {
        return value;
      }
    } else {
      return defaultValue ?? null;
    }
  });

  const setValue = (newValue: T | null) => {
    if (newValue) {
      try {
        setStoredValue(newValue);
        window.localStorage.setItem(key, typeof newValue === 'string' ? newValue : JSON.stringify(newValue));
      } catch {
        setStoredValue(defaultValue ?? null);
        window.localStorage.setItem(key, JSON.stringify(defaultValue ?? null));
      }
    } else {
      setStoredValue(null);
      window.localStorage.removeItem(key);
    }
  };

  return [storedValue, setValue];
}
