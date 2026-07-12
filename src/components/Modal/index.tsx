import { useModal } from '@/hooks/useModal';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export const Modal = () => {
  const { modals, closeModal } = useModal();

  const hasModals = modals.length > 0;
  const currentModal = hasModals ? modals.at(-1) : null;

  useEffect(() => {
    if (!hasModals || !currentModal) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !currentModal.persistent) {
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
  }, [hasModals, closeModal, currentModal]);

  if (!hasModals) {
    return null;
  }

  return (
    <>
      {modals.map((modal, index) => {
        const handleOverlayClick = () => {
          if (!modal.persistent) {
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
              className={`${styles.modalContainer} ${modal.fullScreen ? styles.fullScreen : ''}`}
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
