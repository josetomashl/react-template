import { Notification } from '@/components/Notification';
import { useAppSelector } from '@/store/hooks';
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
