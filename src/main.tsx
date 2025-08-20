import '@/assets/styles/main.scss';
import '@/assets/styles/reset.scss';
import { NotificationsContainer } from '@/components/Notifications';
import { AuthProvider } from '@/contexts/authContext';
import { TranslationProvider } from '@/contexts/translationContext';
import { AppRoutes } from '@/routes';
import { store } from '@/store';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <TranslationProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
          <NotificationsContainer />
        </TranslationProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
