import { AuthLayout } from '@/layouts/Auth';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { HomePage } from '@/pages/home';
import { BrowserRouter, Route, Routes } from 'react-router';
import { DefaultLayout } from './layouts/Default';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />

        <Route element={<AuthLayout />}>
          <Route element={<DefaultLayout />}>
            {/* Pages with navigation */}
            <Route index element={<HomePage />} />
          </Route>
          {/* Pages with no navigation useful for being displayed in app */}
          <Route path='other' element={<LoginPage />} />
        </Route>

        {/* <Route path='legal'>
          <Route index element={<ConcertsHome />} />
          <Route path='terms-of-use' element={<TermsOfUsePage />} />
          <Route path='trending' element={<Trending />} />
          </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
