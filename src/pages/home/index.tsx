import { useAuth } from '@/hooks/useAuth';
import styles from './styles.module.scss';

export function HomePage() {
  const { logout } = useAuth();

  return (
    <>
      <p className={styles.something}>Home page</p>
      <p onClick={logout}>Log out</p>
    </>
  );
}
