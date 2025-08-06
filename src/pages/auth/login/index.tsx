import { Input } from '@/components/Input';
import { useAuth } from '@/hooks/useAuth';
import { useTitle } from '@/hooks/useTitle';
import { RegExp } from '@/plugins/constants/regExp';
import { useAppSelector } from '@/store';
import { FormEvent, useState } from 'react';
import styles from './styles.module.scss';

export function LoginPage() {
  useTitle('Login page');
  const auth = useAppSelector((state) => state.auth);
  const { login } = useAuth();

  const [form, setForm] = useState<{
    email: string;
    password: string;
    errors: string[];
  }>({
    email: '',
    password: '',
    errors: []
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email: form.email, password: form.password });
  };

  return (
    <div>
      <p className={styles.something}>Login page</p>
      <form onSubmit={handleSubmit}>
        <Input
          type='email'
          label='Email'
          value={form.email}
          onChange={(value, valid) => {
            setForm((prev) => ({
              ...prev,
              email: value,
              errors: !valid ? [...prev.errors, 'email'] : prev.errors.filter((e) => e !== 'email')
            }));
          }}
          regExp={RegExp.email}
          errorMessage='Please enter a valid email address'
          required
        />
        <Input
          type='password'
          value={form.password}
          label='Password'
          onChange={(value, valid) => {
            setForm((prev) => ({
              ...prev,
              password: value,
              errors: !valid ? [...prev.errors, 'email'] : prev.errors.filter((e) => e !== 'email')
            }));
          }}
          required
          regExp={RegExp.password}
          errorMessage='Password must be at least 8 characters long and contain at least one number, one uppercase letter and one lowercase letter'
        />

        <button type='submit' disabled={auth.loading || form.errors.length > 0}>
          Login
        </button>
      </form>
    </div>
  );
}
