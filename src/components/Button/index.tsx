import { css } from '@/utils';
import { useState } from 'react';
import { Spinner } from '../Spinner';
import styles from './styles.module.scss';

type Props = {
  title: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

// TODO: Add variants (icon only , icon + text, text only, etc.)

export function Button({ title = '', onClick = () => {}, disabled = false, type = 'button' }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      await onClick();
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      className={css(styles.button, loading ? styles.loading : '', disabled ? styles.disabled : '')}
      disabled={disabled || loading}>
      {loading ? <Spinner /> : title}
    </button>
  );
}
