import { css } from '@/utils';
import { useId, useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

interface Props {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'range' | 'date';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
}

// TODO: Check if required to show error message 'This field is required' or custom text & red color
export function Input({
  type = 'text',
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  clearable = false
}: Props) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (value: string) => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type={type === 'password' ? (!isPasswordVisible ? 'password' : 'text') : type}
          id={id}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === 'password' && (
          <div className={styles.iconContainer} onClick={() => setIsPasswordVisible((prev) => !prev)}>
            <Icon name={isPasswordVisible ? 'chevronLeft' : 'chevronRight'} size={16} color='black' />
          </div>
        )}
        {clearable && value && (
          <div className={styles.iconContainer} onClick={() => handleChange('')}>
            <Icon name='circleX' size={16} color='black' />
          </div>
        )}
      </div>
      {label && (
        <label htmlFor={id} className={css(styles.label, !!value || isFocused ? styles.floating : '')}>
          {label}
        </label>
      )}
    </div>
  );
}
