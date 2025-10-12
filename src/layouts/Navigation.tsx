import { Outlet } from 'react-router';

import { Sidebar } from '@/components/Sidebar';

export function NavigationLayout() {
  return (
    <div id='navigation_layout'>
      <Sidebar />
      <div id='navigation_outlet'>
        <Outlet />
      </div>
    </div>
  );
}
