import { Sidebar } from '@/components/Sidebar';
import { Outlet } from 'react-router';

export function DefaultLayout() {
  return (
    <div id='default_layout'>
      <Sidebar />
      <div id='outlet'>
        <Outlet />
      </div>
    </div>
  );
}
