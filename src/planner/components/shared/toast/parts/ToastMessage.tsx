type ToastMessageProps = {
  className?: string;
  message: string;
};

export const ToastMessage = ({ className, message }: ToastMessageProps) => {


  return <div className={className}>{message}</div>;
};