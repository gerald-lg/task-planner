import { ToastCloseButton, ToastIcon, ToastMessage, useToastContext } from "../../parts";
import { defaultToastVariantConfig } from "./config";

export const DefaultToastContent = () => {
  const { toast } = useToastContext();

  if (!toast) return null;

  const variantConfig = defaultToastVariantConfig[toast.variant];
  const variantStyle = variantConfig.style;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50">
      <div
        className={`${variantStyle.containerClassName} pointer-events-auto flex min-w-[260px] max-w-sm items-start gap-3 rounded-md border p-3 shadow-lg transition-all`}
        role="status"
        aria-live="polite"
      >
        <ToastIcon
          className={`${variantStyle.iconClassName} mt-0.5 shrink-0`}
          loadIcon={variantConfig.loadIcon}
        />

        <ToastMessage className={`${variantStyle.messageClassName} text-sm font-normal`} />

        <ToastCloseButton
          className={`${variantStyle.closeButtonClassName} -m-1 ml-auto rounded p-1 transition-colors`}
        />
      </div>
    </div>
  );
};