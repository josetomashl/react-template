import { useAppSelector } from '@/store';
import { Notification } from '../Notification';
import styles from './styles.module.scss';

export const NotificationsContainer = () => {
  const notifications = useAppSelector((state) => state.root.notifications);

  return (
    <div className={styles.notificationsContainer}>
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
