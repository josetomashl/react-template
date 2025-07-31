import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '@/assets/styles/main.scss';
import '@/assets/styles/reset.scss';
import { NotificationsContainer } from '@/components/Notifications';
import { AuthProvider } from '@/contexts/Auth';
import { AppRoutes } from '@/routes';
import { store } from '@/store';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
        <NotificationsContainer />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
