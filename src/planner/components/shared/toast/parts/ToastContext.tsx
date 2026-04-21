import { createContext, useContext } from "react";
import type { ShowToastOptions, ToastState, VariantToast } from "../types";

type ToastContextValue = {
    toast: ToastState;
    show: (message: string, variant: VariantToast, options?: ShowToastOptions) => void;
    hide: () => void
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ToastContext.Provider;

export const useToastContext = () => {

    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("Toast must be used inside ToastProvider");
    }

    return context;
};