import { useToast } from "../hooks";

type ToastMessageProps = {
  className?: string;
};

export const ToastMessage = ({ className }: ToastMessageProps) => {
  const { toast } = useToast();

  if (!toast) return null;

  return <div className={className}>{toast.message}</div>;
};