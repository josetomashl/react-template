import { AuthContext } from '@/contexts/authContext';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth hook must be used within AuthProvider');
  }

  return context;
};
