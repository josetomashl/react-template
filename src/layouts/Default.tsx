import { Sidebar } from '@/components/Sidebar';
import { Outlet } from 'react-router';

export function DefaultLayout() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <Outlet />
      {/* FOOTER */}
    </div>
  );
}
