import type { UserRole } from '@/dtos/User';
import { useAppSelector } from '@/store';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

type Props = {
  role: UserRole;
  children: ReactNode;
};

export function RoleMiddleware(props: Props) {
  const me = useAppSelector((state) => state.auth.me);

  if (me?.role !== props.role) {
    return <Navigate to='/not-found' replace />;
  }

  return props.children;
}
