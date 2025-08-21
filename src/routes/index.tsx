import { NavigationLayout } from '@/layouts/Navigation';
import { AuthMiddleware } from '@/middlewares/Auth';
import { RoleMiddleware } from '@/middlewares/Role';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { HomePage } from '@/pages/home';
import { Route, Routes } from 'react-router';
import { NotFoundPage } from '../pages/404';
import { Page1 } from '../pages/page1';
import { Page2 } from '../pages/page2';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/*'
        element={
          <AuthMiddleware>
            <Routes>
              {/* Pages with no navigation, useful for being displayed in an app for example */}
              <Route path='app' element={<Page1 />} />

              {/* Pages with navigation */}
              <Route element={<NavigationLayout />}>
                <Route index element={<HomePage />} />
                <Route path='page-1' element={<Page1 />} />

                {/* ONLY ADMIN ROUTES */}
                <Route
                  path='page-2'
                  element={
                    <RoleMiddleware role='ADMIN'>
                      <Page2 />
                    </RoleMiddleware>
                  }
                />
              </Route>

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </AuthMiddleware>
        }
      />

      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
    </Routes>
  );
}
