import { X } from "lucide-react";
import { useToastContext } from "./ToastContext";

type ToastCloseButtonProps = {
    className?: string;
    ariaLabel?: string;
};

export const ToastCloseButton = ({className, ariaLabel = "Close toast" }: ToastCloseButtonProps) => {

    const { hide } = useToastContext();

    return (
        <button
            onClick={hide}
            type="button"
            aria-label={ariaLabel}
            className={className}
        >
            <X size={16} />
        </button>
    );
};