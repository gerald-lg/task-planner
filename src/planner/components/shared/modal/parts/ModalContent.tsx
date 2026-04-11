import type { ReactNode } from "react";

import { useModalContext } from "./ModalContext";

type ModalContentProps = {
  children: ReactNode;
  className?: string;
};

export const ModalContent = ({ children, className }: ModalContentProps) => {
  const { open } = useModalContext();

  if (!open) {
    return null;
  }

  return (
    <section className={className} role="dialog" aria-modal="true">
      {children}
    </section>
  );
};
