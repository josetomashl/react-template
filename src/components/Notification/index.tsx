import { Icon, type IconNames } from '@/components/Icon';
import { type NotificationItem, removeNotification } from '@/store/modules/root';
import { css } from '@/utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

export function Notification({ notification }: { notification: NotificationItem }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(removeNotification(notification.id));
  };

  const getIcon = () => {
    let iconName: IconNames = 'circleInfo';
    switch (notification.type) {
      case 'success':
        iconName = 'circleCheck';
        break;
      case 'warning':
        iconName = 'circleExclamation';
        break;
      case 'error':
        iconName = 'circleX';
        break;
      case 'info':
      default:
        iconName = 'circleInfo';
    }
    return <Icon name={iconName} size={32} />;
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, 5000);
    return () => clearTimeout(timer);
  }, [notification.id]);

  return (
    <div className={css(styles.notification, styles[`notification-${notification.type}`])}>
      {getIcon()}
      <p>{notification.message}</p>
    </div>
  );
}
