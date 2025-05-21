import { ToastContext } from '@/contexts/Toast';
import { useContext } from 'react';

export const useToast = () => useContext(ToastContext);
