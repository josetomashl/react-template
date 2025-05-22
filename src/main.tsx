import { store } from '@/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppRoutes } from './routes';
import './main.scss';
import { AuthProvider } from '@/contexts/Auth';
import { ToastProvider } from '@/contexts/Toast';

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  </ToastProvider>
);
