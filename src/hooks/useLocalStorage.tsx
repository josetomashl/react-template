import { type StorageKey, StorageKeys } from '@/plugins/constants/storage';
import { useState } from 'react';

export function useLocalStorage<T = string>(key: StorageKey, defaultValue?: T): [T | null, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const value = window.localStorage.getItem(StorageKeys[key]);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(StorageKeys[key], JSON.stringify(defaultValue ?? null));
        return defaultValue ?? null;
      }
    } catch {
      return defaultValue ?? null;
    }
  });

  const setValue = (newValue: T) => {
    try {
      setStoredValue(newValue);
      window.localStorage.setItem(StorageKeys[key], JSON.stringify(newValue));
    } catch {
      setStoredValue(defaultValue ?? null);
      window.localStorage.setItem(StorageKeys[key], JSON.stringify(defaultValue ?? null));
    }
  };

  return [storedValue, setValue];
}
