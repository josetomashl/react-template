import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={onClose} role='dialog' aria-modal='true'>
      <div className='modal-container' onClick={(e) => e.stopPropagation()} role='document'>
        <button className='modal-close-btn' onClick={onClose} aria-label='Close modal'>
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
