import { useAuth } from '@/hooks/useAuth';
import styles from './styles.module.scss';

export function HomePage() {
  const { me, logout } = useAuth();

  return (
    <>
      <p className={styles.something}>
        Welcome {me?.name} {me?.role}
      </p>
      <p onClick={logout}>Log out</p>
    </>
  );
}
