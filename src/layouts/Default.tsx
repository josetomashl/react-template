import { Outlet } from 'react-router';

export function DefaultLayout() {
  return (
    <div>
      {/* TODO: add common components such as sidebar/navbar/notifications/loaders/etc */}
      <Outlet />
    </div>
  );
}
