import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';

export function AuthLayout() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
