import { useEffect, useRef, useState } from "react";

const DROPDOWN_OPEN_EVENT = "task-card-dropdown-open";
const DRAG_START_EVENT = "planner:drag-start";

export const useDropdownButton = (id: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDropdownOpen = (event: Event) => {
      const customEvent = event as CustomEvent<string>;

      if (customEvent.detail !== id) {
        setIsOpen(false);
      }
    };

    const handleDragStart = () => {
      setIsOpen(false);
    };

    window.addEventListener(DROPDOWN_OPEN_EVENT, handleDropdownOpen);
    window.addEventListener(DRAG_START_EVENT, handleDragStart);

    return () => {
      window.removeEventListener(DROPDOWN_OPEN_EVENT, handleDropdownOpen);
      window.removeEventListener(DRAG_START_EVENT, handleDragStart);
    };
  }, [id]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const inContainer = containerRef.current?.contains(target);
      const inMenu = menuRef.current?.contains(target);
      if (!inContainer && !inMenu) {
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
    menuRef,
    isOpen,
    toggle,
  };
};