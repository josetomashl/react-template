import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';

export function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
