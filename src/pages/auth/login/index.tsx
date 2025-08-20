import { Input } from '@/components/Input';
import { Table } from '@/components/Table';
import { useAuth } from '@/hooks/useAuth';
import { useTitle } from '@/hooks/useTitle';
import { RegExp } from '@/plugins/constants/regExp';
import { useAppDispatch, useAppSelector } from '@/store';
import { requestUsers, setPage, setPageSize } from '@/store/modules/user';
import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';

export function LoginPage() {
  useTitle('Login page');
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.user);
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

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(pagination);
      dispatch(requestUsers(pagination));
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [pagination]);

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

      <Table
        module='user'
        headers={[
          { key: 'email', label: 'Email' },
          { key: 'password', label: 'Password' },
          { key: 'other', label: 'Other' },
          { key: 'actions', label: '' }
        ]}
        onPageChange={(p) => {
          dispatch(setPage(p));
        }}
        onPageSizeChange={(p) => {
          dispatch(setPageSize(p));
        }}
      />
    </div>
  );
}
