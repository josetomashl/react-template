import { useToast } from '@/hooks/useToast';
import './styles.module.scss';

export const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className='toast-container'>
      {toasts.map((item) => (
        <div key={item.id} className={`toast toast-${item.type}`}>
          {item.message}
        </div>
      ))}
    </div>
  );
};
