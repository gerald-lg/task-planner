import type { ReactNode } from "react";
import { useModalContext } from "./ModalContext";

type ModalTriggerProps<T = unknown> = {
  children: ReactNode;
  className?: string;
  payload?: T;
};

export const ModalTrigger = <T = unknown,>({
  children,
  className,
  payload,
}: ModalTriggerProps<T>) => {
  const { openWith } = useModalContext<T>();

  return (
    <button
      type="button"
      className={className}
      onClick={() => openWith(payload)}
    >
      {children}
    </button>
  );
};
