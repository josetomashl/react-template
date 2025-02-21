import { useAppDispatch, useAppSelector } from '@/store';
import { hideNotification } from '@/store/modules/root';
import { css } from '@/utils';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export default function Notification() {
  const state = useAppSelector((state) => state.root.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state) {
      const timeout = setTimeout(() => {
        dispatch(hideNotification());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [state]);

  if (!state) {
    return null;
  }

  return (
    <div className={css(styles.container, styles[state.type])}>
      <img src={`/images/${state.type}.png`} loading='lazy' alt={state.type} />
      <p>{state.content}</p>
    </div>
  );
}
