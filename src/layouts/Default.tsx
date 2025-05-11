import { Outlet } from 'react-router';

export function DefaultLayout() {
  return (
    <div>
      {/* NAV */}
      <Outlet />
      {/* FOOTER */}
    </div>
  );
}
