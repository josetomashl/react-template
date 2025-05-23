import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { NotificationType, pushNotification } from '@/store/modules/root';

export function LoginPage() {
  const dispatch = useDispatch();

  const handleClick = (type: NotificationType, message: string) => {
    dispatch(pushNotification({ message, type }));
  };

  return (
    <div>
      <p className={styles.something}>Login page</p>
      <button onClick={() => handleClick('info', 'awd')}>Click</button>
      <button onClick={() => handleClick('warning', 'awd awdawd')}>Click</button>
      <button onClick={() => handleClick('success', 'awd')}>Click</button>
      <button onClick={() => handleClick('error', 'awd')}>Click</button>
    </div>
  );
}
