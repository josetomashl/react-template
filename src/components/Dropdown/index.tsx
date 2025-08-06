import { css } from '@/utils';
import { useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

export interface DropdownItem {
  label: string;
  value: string;
}
type SingleValue = DropdownItem | null;
type MultipleValue = DropdownItem[];
type DropdownValue = SingleValue | MultipleValue;

interface Props {
  label?: string;
  items: DropdownItem[];
  value: DropdownValue;
  onChange: (value: DropdownValue) => void;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  multiple?: boolean;
}

export function Dropdown({
  label = 'Choose an option',
  items,
  value,
  onChange,
  disabled,
  required,
  clearable,
  multiple
}: Props) {
  const [isTouched, setIsTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleChange = (v: DropdownItem | null) => {
    if (!disabled && onChange) {
      if (!isTouched) {
        setIsTouched(true);
      }
      onChange(v);
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <div
        className={css(
          styles.container,
          isOpen ? styles.focused : '',
          isTouched && !value && required ? styles.error : ''
        )}
        onClick={toggle}>
        <div className={styles.inputContainer}>
          <span className={styles.input}>{value ? value.label : label}</span>
          <div className={styles.iconsContainer}>
            {clearable && value && (
              <div
                className={styles.icon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange(null);
                }}>
                <Icon name='circleX' size={16} color='black' />
              </div>
            )}
            <div className={styles.icon}>
              <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={16} color='black' />
            </div>
          </div>
        </div>
        {value && <span className={css(styles.label, value ? styles.floating : '')}>{label}</span>}
        <div className={styles.dropdownContainer} onClick={(e) => e.stopPropagation()}>
          {isOpen && (
            <div className={styles.dropdownList}>
              {items.map((item, index) => (
                <div
                  key={item.value}
                  className={css(
                    styles.dropdownItem,
                    value?.value === item.value ? styles.selected : '',
                    index > 0 ? styles.borderTop : ''
                  )}
                  onClick={() => handleChange(item)}>
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <span className={styles.errorMessage}>{isTouched && !value && required ? 'This field is required' : ''}</span>
    </div>
  );
}
