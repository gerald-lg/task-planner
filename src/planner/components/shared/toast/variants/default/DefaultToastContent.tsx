import { ToastCloseButton, ToastIcon, ToastMessage } from "../../parts";
import { defaultToastVariantConfig } from "./config";
import { usePlannerStore } from "@/planner/store/store";

export const DefaultToastContent = () => {
  const toast = usePlannerStore((s) => s.toast);
  const hide = usePlannerStore((s) => s.hideToast);
  
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

        <ToastMessage className={`${variantStyle.messageClassName} text-sm font-normal`} message={toast.message} />

        <ToastCloseButton
          className={`${variantStyle.closeButtonClassName} -m-1 ml-auto rounded p-1 transition-colors`}
          onClose={hide}
        />
      </div>
    </div>
  );
};