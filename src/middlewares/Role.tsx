import type { UserRoles } from '@/dtos/User';
import { useAppSelector } from '@/store';
import { Navigate, Outlet } from 'react-router';

type Props = {
  role: UserRoles;
};

export function RoleMiddleware(props: Props) {
  const me = useAppSelector((state) => state.auth.me);

  if (!me || me.role !== props.role) {
    return <Navigate to='/not-found' />;
  }

  return <Outlet />;
}
