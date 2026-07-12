import { ModalsContext } from '@/contexts/modalsContext';
import { useContext } from 'react';

export const useModals = () => {
  const context = useContext(ModalsContext);

  if (!context) {
    throw new Error('useModals hook must be used within ModalsProvider');
  }

  return context;
};
