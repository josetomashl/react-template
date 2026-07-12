import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import '@/assets/styles/main.scss';
import '@/assets/styles/reset.scss';
import { NotificationsContainer } from '@/components/NotificationsContainer';
import { AuthProvider } from '@/contexts/authContext';
import { TranslationProvider } from '@/contexts/translationContext';
import { AppRoutes } from '@/routes';
import { store } from '@/store';
import { ModalsProvider } from './contexts/modalsContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ModalsProvider>
        <Provider store={store}>
          <TranslationProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
            <NotificationsContainer />
          </TranslationProvider>
        </Provider>
      </ModalsProvider>
    </BrowserRouter>
  </StrictMode>
);
