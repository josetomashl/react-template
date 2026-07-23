import { Route, Routes } from 'react-router';

import { AuthMiddleware } from '@/middlewares/Auth';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { TryOutPage } from '@/pages/try-out';
import { ProtectedRoutes } from '@/routes/protected';

export function Router() {
  return (
    <Routes>
      <Route
        path='/*'
        element={
          <AuthMiddleware>
            <ProtectedRoutes />
          </AuthMiddleware>
        }
      />

      <Route path='try-out' element={<TryOutPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
    </Routes>
  );
}
