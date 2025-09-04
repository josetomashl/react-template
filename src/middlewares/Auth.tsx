import { useAuth } from '@/hooks/useAuth';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export function AuthMiddleware({ children }: PropsWithChildren) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
