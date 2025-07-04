import { useTitle } from '@/hooks/useTitle';
import styles from './styles.module.scss';

export function RegisterPage() {
  useTitle('Register page');

  return (
    <div>
      <p className={styles.something}>Register page</p>
    </div>
  );
}
