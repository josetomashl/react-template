import { Outlet } from 'react-router';

export default function AuthLayout() {
  // TODO: check authentication status to redirect to login page or keep here
  return <Outlet />;
}
