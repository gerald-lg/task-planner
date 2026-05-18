import { usePlannerStore } from "@/planner/store/store";
import { DefaultToastContent } from "../variants";

export const ToastDisplay = () => {
  const toast = usePlannerStore((s) => s.toast);
  
  if (!toast) return null;

  return <DefaultToastContent />;
};