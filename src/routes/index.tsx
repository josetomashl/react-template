import { Route, Routes } from 'react-router';

import { AuthMiddleware } from '@/middlewares/Auth';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { ProtectedRoutes } from '@/routes/protected';

export function AppRoutes() {
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

      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
    </Routes>
  );
}
