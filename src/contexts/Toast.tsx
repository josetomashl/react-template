import { ToastContainer } from '@/components/ToastContainer';
import type { Toast } from '@/types/Toast';
import { createContext, useState, useCallback, PropsWithChildren } from 'react';

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: Toast['type'], duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {}
});

const ToastProvider = (props: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string = 'Actualizado con éxito.', type: Toast['type'] = 'info', duration = 3000) => {
      const id = `${Date.now()}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      // Remove toast after delay
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {props.children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
