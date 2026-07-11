import { useModal } from '@/hooks/useModal';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export const Modal = () => {
  const { modals, closeModal } = useModal();
  const hasModals = modals.length > 0;

  useEffect(() => {
    if (!hasModals) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Cierra solo el modal superior de la pila.
        closeModal();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [hasModals, closeModal]);

  if (!hasModals) {
    return null;
  }

  return (
    <>
      {modals.map((modal, index) => {
        const isFullscreen = modal.variant === 'fullscreen';

        const handleOverlayClick = () => {
          if (modal.closeOnOverlayClick) {
            closeModal({ until: modal.id });
          }
        };

        return (
          <div
            key={modal.id}
            className={styles.modalOverlay}
            style={{ zIndex: 1000 + index }}
            onClick={handleOverlayClick}>
            <div
              className={`${styles.modalContainer} ${isFullscreen ? styles.fullscreen : ''}`}
              onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeButton} onClick={() => closeModal({ until: modal.id })}>
                &times;
              </button>

              {modal.content}
            </div>
          </div>
        );
      })}
    </>
  );
};
