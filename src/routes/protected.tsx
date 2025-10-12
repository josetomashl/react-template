import { Route, Routes } from 'react-router';

import { USERS } from '@/constants/users';
import { NavigationLayout } from '@/layouts/Navigation';
import { RoleMiddleware } from '@/middlewares/Role';
import { NotFoundPage } from '@/pages/404';
import { HomePage } from '@/pages/home';
import { Page1 } from '@/pages/page1';
import { Page2 } from '@/pages/page2';

export function ProtectedRoutes() {
  return (
    <Routes>
      {/* Pages with no navigation, useful for being displayed in an app for example */}
      <Route path='app' element={<Page1 />} />

      {/* Pages with navigation */}
      <Route element={<NavigationLayout />}>
        <Route index element={<HomePage />} />
        <Route path='page-1' element={<Page1 />} />

        {/* ONLY ADMIN ROUTES */}
        <Route path='admin'>
          <Route
            path='page-2'
            element={
              <RoleMiddleware roles={[USERS.roles.ADMIN, USERS.roles.SUPER]}>
                <Page2 />
              </RoleMiddleware>
            }
          />
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
