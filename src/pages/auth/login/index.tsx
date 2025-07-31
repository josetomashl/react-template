import { useAuth } from '@/hooks/useAuth';
import { useTitle } from '@/hooks/useTitle';
import { useAppSelector } from '@/store';
import { FormEvent, useState } from 'react';
import styles from './styles.module.scss';

export function LoginPage() {
  useTitle('Login page');
  const auth = useAppSelector((state) => state.auth);
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div>
      <p className={styles.something}>Login page</p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        />
        <input
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button type='reset'>Clear</button>
        <button type='submit' disabled={auth.loading}>
          Login
        </button>
      </form>
    </div>
  );
}
