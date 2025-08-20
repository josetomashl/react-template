import { Sidebar } from '@/components/Sidebar';
import { Outlet } from 'react-router';

export function NavigationLayout() {
  return (
    <div id='navigation_layout'>
      <Sidebar />
      <div id='outlet'>
        <Outlet />
      </div>
    </div>
  );
}
