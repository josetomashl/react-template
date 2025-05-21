import { ToastContainer } from '@/components/ToastContainer';
import { createContext, useState, useCallback, PropsWithChildren } from 'react';

export type ToastType = {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
};

const ToastContext = createContext({
  addToast: () => {}
});

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    (message: string = 'Actualizado con éxito.', type: ToastType['type'] = 'info', duration = 3000) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      // Remove toast after delay
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
