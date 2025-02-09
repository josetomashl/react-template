import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import AuthLayout from '@/layouts/AuthLayout';
import RegisterPage from '@/pages/register';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      {/* <Route path='about' element={<About />} /> */}

      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route element={<AuthLayout />}>{/* <Route path='about' element={<Dashboard />} /> */}</Route>

      {/* <Route path='concerts'>
          <Route index element={<ConcertsHome />} />
          <Route path=':city' element={<City />} />
          <Route path='trending' element={<Trending />} />
        </Route> */}
    </Routes>
  </BrowserRouter>
);
