import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

export const toastVariants = ["success", "error", "info", "warning"] as const;
export const toastKinds = ["default"] as const;

export type VariantToast = (typeof toastVariants)[number];
export type ToastKind = (typeof toastKinds)[number];
export type ToastIconComponent = ComponentType<LucideProps>;

export type ToastData = {
    message: string;
    variant: VariantToast;
    kind: ToastKind;
};

export type ToastState = ToastData | null;

export type ShowToastOptions = {
    duration?: number;
    kind?: ToastKind;
};