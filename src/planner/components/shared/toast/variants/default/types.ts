import type { ToastIconComponent, VariantToast } from "../../types";

export type ToastVariantStyle = {
  containerClassName: string;
  iconClassName: string;
  messageClassName: string;
  closeButtonClassName: string;
};

export type ToastVariantConfig = {
  style: ToastVariantStyle;
  loadIcon: () => Promise<ToastIconComponent>;
};

export type ToastVariantConfigMap = Record<VariantToast, ToastVariantConfig>;