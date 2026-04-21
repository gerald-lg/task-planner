import type { ToastVariantConfigMap } from "./types";

export const defaultToastVariantConfig: ToastVariantConfigMap = {
  success: {
    style: {
      containerClassName: "border-green-300 bg-green-100 text-green-900",
      iconClassName: "text-green-700",
      messageClassName: "text-green-900",
      closeButtonClassName: "text-green-700 hover:text-green-900",
    },
    loadIcon: async () => {
      const module = await import("lucide-react");
      return module.CircleCheckBig;
    },
  },
  error: {
    style: {
      containerClassName: "border-red-300 bg-red-100 text-red-900",
      iconClassName: "text-red-700",
      messageClassName: "text-red-900",
      closeButtonClassName: "text-red-700 hover:text-red-900",
    },
    loadIcon: async () => {
      const module = await import("lucide-react");
      return module.CircleX;
    },
  },
  info: {
    style: {
      containerClassName: "border-sky-300 bg-sky-100 text-sky-900",
      iconClassName: "text-sky-700",
      messageClassName: "text-sky-900",
      closeButtonClassName: "text-sky-700 hover:text-sky-900",
    },
    loadIcon: async () => {
      const module = await import("lucide-react");
      return module.Info;
    },
  },
  warning: {
    style: {
      containerClassName: "border-amber-300 bg-amber-100 text-amber-900",
      iconClassName: "text-amber-700",
      messageClassName: "text-amber-900",
      closeButtonClassName: "text-amber-700 hover:text-amber-900",
    },
    loadIcon: async () => {
      const module = await import("lucide-react");
      return module.CircleAlert;
    },
  },
};