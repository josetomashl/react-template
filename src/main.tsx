import { AuthProvider } from '@/contexts/Auth';
import { store } from '@/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { NotificationsContainer } from './components/Notifications';
import './main.scss';
import { AppRoutes } from './routes';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    <NotificationsContainer />
  </Provider>
);
