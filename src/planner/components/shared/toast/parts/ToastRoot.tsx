import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ToastProvider } from "./ToastContext";
import type { ShowToastOptions, ToastState, VariantToast } from "../types";
import { DefaultToastContent } from "../variants";

const DEFAULT_TOAST_DURATION = 3000;

type ToastRootProps = {
    children: ReactNode;
};

export const ToastRoot = ({ children }: ToastRootProps) => {
    const [toast, setToast] = useState<ToastState>(null);
    const timeoutRef = useRef<number | null>(null);

    const clearAutoHideTimeout = useCallback(() => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const hide = useCallback(() => {
        clearAutoHideTimeout();
        setToast(null);
    }, [clearAutoHideTimeout]);

    const show = useCallback((message: string, variant: VariantToast, options?: ShowToastOptions) => {
        clearAutoHideTimeout();
        
        setToast({
            message,
            variant,
            kind: options?.kind ?? "default",
        });

        const duration = options?.duration ?? DEFAULT_TOAST_DURATION;

        if (duration > 0) {
            timeoutRef.current = window.setTimeout(() => {
                setToast(null);
                timeoutRef.current = null;
            }, duration);
        }
    }, [clearAutoHideTimeout]);

    useEffect(() => {
        return () => clearAutoHideTimeout();
    }, [clearAutoHideTimeout]);

    const contextValue = useMemo(
        () => ({
            toast,
            show,
            hide,
        }),
        [toast, show, hide],
    );

    const toastContentByKind = {
        default: <DefaultToastContent />,
    } as const;

    const activeContent = toast
        ? toastContentByKind[toast.kind] ?? toastContentByKind.default
        : null;

    return (
        <ToastProvider value={contextValue}>
            {children}
            {activeContent}
        </ToastProvider>
    );
};