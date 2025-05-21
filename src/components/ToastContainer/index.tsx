import type { ToastType } from '@/contexts/Toast';
import './toast.css';

type Props = {
  toasts: ToastType[];
};

export const ToastContainer = ({ toasts }: Props) => {
  return (
    <div className='toast-container'>
      {toasts.map(({ id, message, type }) => (
        <div key={id} className={`toast toast-${type}`}>
          {message}
        </div>
      ))}
    </div>
  );
};
