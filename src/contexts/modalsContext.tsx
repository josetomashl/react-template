import { Modal } from '@/components/Modal';
import { type ReactNode, createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type CloseModalOptionsType =
  | { all: true; count?: never; until?: never }
  | { count: number; all?: never; until?: never }
  | { until: number; all?: never; count?: never };

interface IModalOptions {
  fullScreen?: boolean;
  persistent?: boolean;
}

interface IModalController {
  id: number;
  close: () => void;
  replace: (content: ReactNode, options?: Omit<IModalOptions, 'fullScreen'>) => void;
  isOpen: () => boolean;
  resolve: (accepted: boolean) => void;
}

interface IModalInstance {
  id: number;
  content: ReactNode;
  fullScreen: boolean;
  persistent: boolean;
  resolve?: (accepted: boolean) => void;
}

interface IModalContext {
  readonly modals: readonly IModalInstance[];
  openModal: (content: ReactNode, options?: IModalOptions) => IModalController;
  openModalAsync: (content: ReactNode, options?: IModalOptions) => Promise<boolean>;
  closeModal: (options?: CloseModalOptionsType) => void;
}

const ModalsContext = createContext<IModalContext | null>(null);

interface Props {
  children: ReactNode;
}

const ModalsProvider = ({ children }: Props) => {
  const nextId = useRef(1);
  const modalsRef = useRef<IModalInstance[]>([]);
  const [modals, setModals] = useState<IModalInstance[]>([]);

  const commit = useCallback((updater: (current: IModalInstance[]) => IModalInstance[]) => {
    setModals((current) => {
      const next = updater(current);
      modalsRef.current = next;
      return next;
    });
  }, []);

  // Liquida las promesas pendientes si el provider se desmonta.
  useEffect(() => {
    return () => {
      modalsRef.current.forEach((modal) => modal.resolve?.(false));
    };
  }, []);

  const createController = useCallback(
    (id: number): IModalController => ({
      id,
      close: () => {
        modalsRef.current.find((x) => x.id === id)?.resolve?.(false);
        commit((current) => current.filter((x) => x.id !== id));
      },
      replace: (content, options) => {
        commit((current) =>
          current.map((x) =>
            x.id === id
              ? {
                  ...x,
                  content,
                  persistent: options?.persistent ?? x.persistent
                }
              : x
          )
        );
      },
      isOpen: () => {
        return modalsRef.current.some((x) => x.id === id);
      },
      resolve: (accepted) => {
        modalsRef.current.find((x) => x.id === id)?.resolve?.(accepted);
        commit((current) => current.filter((x) => x.id !== id));
      }
    }),
    [commit]
  );

  const openModal = useCallback(
    (content: ReactNode, options: IModalOptions = {}): IModalController => {
      const id = nextId.current++;
      commit((current) => [
        ...current,
        {
          id,
          content,
          fullScreen: options.fullScreen ?? false,
          persistent: options.persistent ?? false
        }
      ]);

      return createController(id);
    },
    [commit, createController]
  );

  const openModalAsync = useCallback(
    (content: ReactNode, options: IModalOptions = {}): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        const id = nextId.current++;

        let settled = false;
        const settle = (accepted: boolean) => {
          if (settled) return;
          settled = true;
          resolve(accepted);
        };

        commit((current) => [
          ...current,
          {
            id,
            content,
            fullScreen: options.fullScreen ?? false,
            persistent: options.persistent ?? false,
            resolve: settle
          }
        ]);
      });
    },
    [commit]
  );

  const closeModal = useCallback(
    (options?: CloseModalOptionsType) => {
      const current = modalsRef.current;
      if (!current.length) {
        return;
      }

      let kept: IModalInstance[];

      if (options?.all) {
        kept = [];
      } else if (options?.until !== undefined) {
        const index = current.findIndex((x) => x.id === options.until);
        if (index === -1) {
          return;
        }
        kept = current.slice(0, index);
      } else {
        const count = Math.max(options?.count ?? 1, 1);
        kept = current.slice(0, Math.max(current.length - count, 0));
      }

      // Liquida las promesas de los modales eliminados antes de aplicar el estado.
      const keptIds = new Set(kept.map((x) => x.id));
      current.forEach((modal) => {
        if (!keptIds.has(modal.id)) {
          modal.resolve?.(false);
        }
      });

      commit(() => kept);
    },
    [commit]
  );

  const contextValue = useMemo(
    () => ({ modals, openModal, openModalAsync, closeModal }),
    [modals, openModal, openModalAsync, closeModal]
  );

  return (
    <ModalsContext.Provider value={contextValue}>
      {children}
      <Modal />
    </ModalsContext.Provider>
  );
};

export { ModalsContext, ModalsProvider };
