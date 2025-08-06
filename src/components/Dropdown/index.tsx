import { css } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.scss';

export interface DropdownItem {
  label: string;
  value: string;
}
type SingleValue = DropdownItem | null;
type MultipleValue = DropdownItem[];
export type DropdownValue = SingleValue | MultipleValue;

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

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedItems: DropdownItem[] = multiple
    ? (value as DropdownItem[]) || []
    : value
    ? [value as DropdownItem]
    : [];

  const toggle = () => {
    if (disabled) {
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleChange = (item: DropdownItem) => {
    if (disabled) {
      return;
    }
    if (!isTouched) {
      setIsTouched(true);
    }
    if (multiple) {
      const exists = selectedItems.some((i) => i.value === item.value);
      const newSelection = exists ? selectedItems.filter((i) => i.value !== item.value) : [...selectedItems, item];
      onChange(newSelection);
    } else {
      onChange(item);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isTouched) {
      setIsTouched(true);
    }
    onChange(multiple ? [] : null);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const getDisplayLabel = () => {
    if (multiple) {
      if (selectedItems.length === 0) return label;
      return selectedItems.map((item) => item.label).join(', ');
    }
    return selectedItems[0]?.label || label;
  };

  const hasError = isTouched && (multiple ? selectedItems.length === 0 : !selectedItems[0]) && required;

  return (
    <div ref={dropdownRef} className={styles.inputWrapper}>
      <div
        className={css(styles.container, isOpen ? styles.focused : '', hasError ? styles.error : '')}
        onClick={toggle}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}>
        <div className={styles.inputContainer}>
          <span className={styles.input}>{getDisplayLabel()}</span>
          <div className={styles.iconsContainer}>
            {!disabled && clearable && selectedItems.length > 0 && (
              <div className={styles.icon} onClick={handleClear} tabIndex={0}>
                <Icon name='circleX' size={16} color='black' />
              </div>
            )}
            <div className={styles.icon}>
              <Icon name={isOpen ? 'chevronUp' : 'chevronDown'} size={16} color='black' />
            </div>
          </div>
        </div>
        {selectedItems.length > 0 && <span className={css(styles.label, styles.floating)}>{label}</span>}
        <div className={styles.dropdownContainer} onClick={(e) => e.stopPropagation()}>
          {isOpen && (
            <div className={styles.dropdownList}>
              {items.map((item, index) => {
                const isSelected = selectedItems.some((i) => i.value === item.value);
                return (
                  <div
                    key={item.value}
                    className={css(
                      styles.dropdownItem,
                      isSelected ? styles.selected : '',
                      index > 0 ? styles.borderTop : ''
                    )}
                    onClick={() => handleChange(item)}>
                    {multiple && (
                      <input type='checkbox' checked={isSelected} readOnly className={styles.checkbox} tabIndex={-1} />
                    )}
                    {item.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <span className={styles.errorMessage}>{hasError ? 'This field is required' : ''}</span>
    </div>
  );
}
