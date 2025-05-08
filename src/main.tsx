import { Notification } from '@/components/Notification';
import { store } from '@/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppRoutes } from './routes';
import './main.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRoutes />
    <Notification />
  </Provider>
);
