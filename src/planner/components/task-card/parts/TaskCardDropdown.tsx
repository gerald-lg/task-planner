
import type { ReactNode } from "react";

import { colorClasses } from "@planner/helpers";
import { useDropdownButton } from "@planner/hooks/useDropdownButton";
import { useTaskCardContext } from "./TaskCardContext";

type MenuAction = {
    id: string;
    label: string;
    icon: ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

interface TaskCardDropdownProps {
    actions: MenuAction[];
}

export const TaskCardDropdown = ({ actions }: TaskCardDropdownProps) => {
    const { id, color } = useTaskCardContext();

    const menuColorClass = color ? colorClasses[color].section : "bg-slate-950/95";

    const { close, containerRef, isOpen, toggle } = useDropdownButton(id);
    
    const buttonId = `${id}-task-card-menu-button`;
    const menuId = `${id}-task-card-menu`;

    const handleActionClick = (action: MenuAction) => {
        if (action.disabled) {
            return;
        }

        action.onClick();
        close();
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                id={buttonId}
                aria-controls={menuId}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label="Open task actions"
                className={[
                    "rounded-md border p-1 text-sm font-medium leading-5 text-white",
                    "transition-colors duration-150 ease-out",
                    "focus:outline-none focus-visible:bg-white/10 focus-visible:border-white/10",
                    "focus-visible:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]",
                    isOpen ? "border-white/10 bg-white/10 shadow-[0_6px_18px_rgba(15,23,42,0.18)]" : "border-transparent hover:bg-white/6",
                ].join(" ")}
                type="button"
                onClick={toggle}
                onPointerDown={(event) => event.stopPropagation()}
            >
                <svg className="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M6 12h.01m6 0h.01m5.99 0h.01" />
                </svg>
            </button>

            {isOpen ? (
                <div
                    id={menuId}
                    role="menu"
                    aria-labelledby={buttonId}
                    className={`absolute left-0 top-full z-10 mt-1 w-44 rounded-md border border-white/15 ${menuColorClass} p-1 shadow-lg`}
                    onPointerDown={(event) => event.stopPropagation()}
                >
                    <ul className="text-sm font-medium text-white">
                        {actions.map((action) => (
                            <li key={action.id}>
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => handleActionClick(action)}
                                    disabled={action.disabled}
                                    className="inline-flex w-full items-center rounded-md px-3 py-2 text-left transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {action.icon}
                                    {action.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};