import { store } from '@/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppRoutes } from './routes';
import './main.scss';
import { AuthProvider } from '@/contexts/Auth';
import { NotificationsContainer } from './components/NotificationsContainer';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    <NotificationsContainer />
  </Provider>
);
