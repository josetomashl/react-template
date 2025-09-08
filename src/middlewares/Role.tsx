import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  roles: string[];
  children: ReactNode;
};

export function RoleMiddleware(props: Props) {
  const { isLoading, me } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!me || !props.roles.includes(me.role)) {
    return <Navigate to='/not-found' replace />;
  }

  return props.children;
}
