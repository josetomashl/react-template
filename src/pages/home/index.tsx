import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/store';
import styles from './styles.module.scss';

export function HomePage() {
  const { logout } = useAuth();
  const me = useAppSelector((state) => state.auth.me);

  return (
    <>
      <p className={styles.something}>Welcome {me?.name}</p>
      <p onClick={logout}>Log out</p>
    </>
  );
}
