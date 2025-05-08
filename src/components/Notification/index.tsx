import { useAppDispatch, useAppSelector } from '@/store';
import { hideNotification } from '@/store/modules/root';
import { css } from '@/utils';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export function Notification() {
  const notif = useAppSelector((state) => state.root.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notif) {
      const timeout = setTimeout(() => {
        dispatch(hideNotification());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [notif]);

  if (!notif) {
    return null;
  }

  return (
    <div className={css(styles.container, styles[notif.type])}>
      <img src={`/images/${notif.type}.png`} loading='lazy' alt={notif.type} />
      <p>{notif.content}</p>
    </div>
  );
}
