import { type PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = (props: PropsWithChildren<Props>) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') props.onClose();
    };
    if (props.isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [props.isOpen, props.onClose]);

  if (!props.isOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className={styles.modalOverlay} onClick={props.onClose} role='dialog' aria-modal='true'>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()} role='document'>
        <button className={styles.modalCloseBtn} onClick={props.onClose} aria-label='Close modal'>
          &times;
        </button>
        {props.children}
      </div>
    </div>,
    modalRoot
  );
};
