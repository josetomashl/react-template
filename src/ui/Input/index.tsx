import { classes } from '@/utils';
import { useCallback, useEffect, useId, useState } from 'react';
import { Icon } from '../../components/Icon';
import styles from './styles.module.scss';

interface Props {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date';
  label?: string;
  value: string;
  onChange: (value: string, valid: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  regExp?: RegExp;
  errorMessage?: string;
  backgroundColor?: string;
}

export function Input({
  type = 'text',
  label,
  value,
  onChange,
  disabled,
  required,
  clearable,
  regExp,
  errorMessage = 'This field is required',
  backgroundColor
}: Props) {
  const id = useId();
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [isValueVisible, setIsValueVisible] = useState(false);
  const toggleVisibility = () => setIsValueVisible((prev) => !prev);

  const handleChange = (v: string) => {
    if (!disabled && onChange) {
      if (!isTouched) {
        setIsTouched(true);
      }
      onChange(v, checkValidity(v));
    }
  };

  const checkValidity = useCallback(
    (v: string) => {
      if (!v && required) {
        return false;
      } else if (regExp) {
        return regExp.test(v);
      } else {
        return true;
      }
    },
    [required, regExp]
  );

  useEffect(() => {
    setIsValid(checkValidity(value));
  }, [value, checkValidity]);

  return (
    <div className={classes(styles.inputWrapper, disabled && styles.disabled)}>
      <div className={classes(styles.container, isFocused && styles.focused, !isValid && isTouched && styles.error)}>
        <div className={styles.inputContainer}>
          <input
            type={type === 'password' ? (!isValueVisible ? 'password' : 'text') : type}
            id={id}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            required={required}
            className={styles.input}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={backgroundColor ? { backgroundColor } : undefined}
          />
          {!disabled && type === 'password' && (
            <div className={styles.iconContainer} onClick={toggleVisibility}>
              <Icon name={isValueVisible ? 'chevronLeft' : 'chevronRight'} size={16} color='black' />
            </div>
          )}
          {!disabled && clearable && value && (
            <div className={styles.iconContainer} onClick={() => handleChange('')}>
              <Icon name='circleX' size={16} color='black' />
            </div>
          )}
        </div>
        {label && (
          <label
            htmlFor={id}
            className={classes(styles.label, (!!value || isFocused || type === 'date') && styles.floating)}
            style={backgroundColor ? { backgroundColor } : undefined}>
            {label}
          </label>
        )}
      </div>
      <span className={styles.errorMessage}>{isTouched && !isValid ? errorMessage : ''}</span>
    </div>
  );
}
