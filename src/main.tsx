import Notification from '@/components/Notification';
import { store } from '@/store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './main.scss';
import AppRoutes from './routes';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRoutes />
    <Notification />
  </Provider>
);
