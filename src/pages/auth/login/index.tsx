import { useTitle } from '@/hooks/useTitle';
import styles from './styles.module.scss';

export function LoginPage() {
  useTitle('Login page');

  return (
    <div>
      <p className={styles.something}>Login page</p>
    </div>
  );
}
