import { useEffect, useRef, useState } from "react";

const DROPDOWN_OPEN_EVENT = "task-card-dropdown-open";

export const useDropdownButton = (id: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDropdownOpen = (event: Event) => {
      const customEvent = event as CustomEvent<string>;

      if (customEvent.detail !== id) {
        setIsOpen(false);
      }
    };

    window.addEventListener(DROPDOWN_OPEN_EVENT, handleDropdownOpen);

    return () => {
      window.removeEventListener(DROPDOWN_OPEN_EVENT, handleDropdownOpen);
    };
  }, [id]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    window.dispatchEvent(new CustomEvent(DROPDOWN_OPEN_EVENT, { detail: id }));
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    close,
    containerRef,
    isOpen,
    toggle,
  };
};