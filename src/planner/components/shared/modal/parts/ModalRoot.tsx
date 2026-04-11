
import { useState, useMemo, type ReactNode } from "react";
import { ModalProvider } from "./ModalContext";

type ModalRootProps = {
  children: ReactNode;
};

export const ModalRoot = ({ children }: ModalRootProps) => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<unknown>();

  const contextValue = useMemo(
    () => ({
      open,
      payload,
      setOpen,
      close: () => setOpen(false),
      openWith: (nextPayload?: unknown) => {
        setPayload(nextPayload);
        setOpen(true);
      },
    }),
    [open, payload],
  );

  return <ModalProvider value={contextValue}>{children}</ModalProvider>;
};