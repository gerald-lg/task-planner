import type { ToastKind, ToastState, VariantToast } from "@/planner/components";
import type { StateCreator } from "zustand";


export interface ToastSlice {
    toast: ToastState;
    showToast: (message: string, variant: VariantToast, options?: { duration?: number; kind?: ToastKind }) => void;
    hideToast: () => void;
}
let toastTimeout: number | null = null;
const DEFAULT_DURATION = 3000;

export const createToastSlice : StateCreator<ToastSlice> = (set) => ({
    toast: null,
    showToast: (message, variant, options) => {
        if (toastTimeout) window.clearTimeout(toastTimeout);

        set({ toast: { message, variant, kind: options?.kind ?? "default" } });

        const duration = options?.duration ?? DEFAULT_DURATION;

        if (duration > 0) {
            toastTimeout = window.setTimeout(() => set({ toast: null }), duration);
        }
    },
    hideToast: () => {
        if (toastTimeout) window.clearTimeout(toastTimeout);
        set({ toast: null });
    },
       

});