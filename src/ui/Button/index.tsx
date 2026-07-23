import { Icon, type IconNames } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { classes } from '@/utils';
import { useState } from 'react';
import styles from './styles.module.scss';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  icon?: IconNames;
  iconPosition?: 'left' | 'right';
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  rounded?: boolean;
};

export function Button({
  title = '',
  icon = undefined,
  iconPosition = 'left',
  onClick = () => {},
  disabled = false,
  type = 'button',
  rounded = false
}: Props) {
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
    }
  };

  if (icon && !title) {
    return (
      <button
        type={type}
        onClick={handleClick}
        className={classes(
          styles.button,
          styles.iconButton,
          rounded && styles.rounded,
          loading && styles.loading,
          disabled && styles.disabled
        )}
        disabled={disabled || loading}>
        {loading ? <Spinner /> : <Icon name={icon} />}
      </button>
    );
  } else if (icon && title) {
    return (
      <button
        onClick={handleClick}
        type={type}
        className={classes(
          styles.button,
          styles.iconTextButton,
          rounded && styles.rounded,
          loading && styles.loading,
          disabled && styles.disabled
        )}
        disabled={disabled || loading}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {iconPosition === 'left' && <Icon name={icon} />}
            {title}
            {iconPosition === 'right' && <Icon name={icon} />}
          </>
        )}
      </button>
    );
  } else {
    return (
      <button
        onClick={handleClick}
        type={type}
        className={classes(
          styles.button,
          rounded && styles.rounded,
          loading && styles.loading,
          disabled && styles.disabled
        )}
        disabled={disabled || loading}>
        {loading ? <Spinner /> : title}
      </button>
    );
  }
}
