import { css } from '@/utils';
import { useId } from 'react';
import styles from './styles.module.scss';

interface Props {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export function Switch(props: Props) {
  const id = useId();

  const handleToggle = () => {
    if (!props.disabled && props.onChange) {
      props.onChange(!props.value);
    }
  };

  return (
    <div className={styles.container}>
      <input type='checkbox' id={id} checked={props.value} onChange={handleToggle} disabled={props.disabled} />
      <span
        className={css(styles.track, props.value ? styles.checked : '', props.disabled ? styles.disabled : '')}
        style={{ cursor: props.disabled ? 'not-allowed' : 'pointer' }}
        onClick={handleToggle}>
        <span className={styles.thumb} />
      </span>
      {props.label && (
        <label htmlFor={id} className={styles.label}>
          {props.label}
        </label>
      )}
    </div>
  );
}
