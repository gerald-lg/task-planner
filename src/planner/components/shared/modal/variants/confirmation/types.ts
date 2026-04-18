export type ConfirmationModalVariant = "warning" | "error" | "success" | "info";

export type ConfirmationModalPayload = {
  kind: "confirmation";
  title: string;
  description: string;
  variant?: ConfirmationModalVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
};
