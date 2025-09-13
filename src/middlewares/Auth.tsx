import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';

export function AuthMiddleware({ children }: { children: ReactNode }) {
  const { isLoading, token } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
