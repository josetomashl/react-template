import { Icon, type IconNames } from '@/components/Icon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeNotification, type NotificationItem } from '@/store/modules/root';
import { classes } from '@/utils';
import { memo, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';

const NOTIFICATION_TIMEOUT = 5000;
const NOTIFICATION_ICONS: Record<NotificationItem['type'], IconNames> = {
  success: 'circleCheck',
  warning: 'circleExclamation',
  error: 'circleX',
  info: 'circleInfo'
};

export const NotificationsContainer = () => {
  const notifications = useAppSelector((state) => state.root.notifications);

  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

interface NotificationProps {
  notification: NotificationItem;
}

const Notification = memo(({ notification }: NotificationProps) => {
  const { id, type, message } = notification;
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(removeNotification(id));
  }, [dispatch, id]);

  useEffect(() => {
    const timer = setTimeout(handleClose, NOTIFICATION_TIMEOUT);
    return () => clearTimeout(timer);
  }, [handleClose]);

  return (
    <div
      className={classes(styles.notification, styles[`notification-${type}`])}
      role={type === 'error' ? 'alert' : 'status'}>
      <Icon name={NOTIFICATION_ICONS[type]} size={32} />
      <p>{message}</p>
    </div>
  );
});

Notification.displayName = 'Notification';
