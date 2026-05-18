import { usePlannerStore } from "@/planner/store/store";

export const useToast = () => ({
  show: usePlannerStore((s) => s.showToast),
  hide: usePlannerStore((s) => s.hideToast),
});