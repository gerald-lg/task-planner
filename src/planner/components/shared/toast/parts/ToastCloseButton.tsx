import { X } from "lucide-react";

type ToastCloseButtonProps = {
    className?: string;
    ariaLabel?: string;
    onClose: () => void;
};

export const ToastCloseButton = ({className, ariaLabel = "Close toast", onClose }: ToastCloseButtonProps) => {


    return (
        <button
            onClick={onClose}
            type="button"
            aria-label={ariaLabel}
            className={className}
        >
            <X size={16} />
        </button>
    );
};