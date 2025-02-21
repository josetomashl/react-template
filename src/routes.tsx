import AuthLayout from '@/layouts/Auth';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import { BrowserRouter, Route, Routes } from 'react-router';
import DefaultLayout from './layouts/Default';

export default function AppRoutes() {
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

        {/* <Route path='concerts'>
          <Route index element={<ConcertsHome />} />
          <Route path=':city' element={<City />} />
          <Route path='trending' element={<Trending />} />
          </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
