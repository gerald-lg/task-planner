import { createContext, useContext } from "react";

type ModalContextValue<T = unknown> = {
  open: boolean;
  payload?: T;
  setOpen: (open: boolean) => void;
  close: () => void;
  openWith: (payload?: T) => void;
};

const ModalContext = createContext<ModalContextValue<unknown> | null>(null);

export const ModalProvider = ModalContext.Provider;

export const useModalContext = <T = unknown>() => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Modal must be used inside Modal.Root");
  }

  return context as ModalContextValue<T>;
};
