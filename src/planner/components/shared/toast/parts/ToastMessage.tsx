import { useToastContext } from "./ToastContext";

type ToastMessageProps = {
  className?: string;
};

export const ToastMessage = ({ className }: ToastMessageProps) => {
  const { toast } = useToastContext();

  if (!toast) return null;

  return <div className={className}>{toast.message}</div>;
};