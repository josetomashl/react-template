import { NavigationLayout } from '@/layouts/Navigation';
import { AuthMiddleware } from '@/middlewares/Auth';
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
      <Route path='/' element={<AuthMiddleware />}>
        <Route element={<NavigationLayout />}>
          {/* Pages with navigation */}
          <Route index element={<HomePage />} />
          <Route path='page-1' element={<Page1 />} />
          <Route path='page-2' element={<Page2 />} />
        </Route>

        {/* Pages with no navigation useful for being displayed in app */}
        <Route path='app' element={<Page1 />} />
      </Route>

      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
