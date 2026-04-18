import { useModalContext } from "./parts/ModalContext";
import type { EditTaskModalPayload } from "./variants/edit-task";
import type { ConfirmationModalPayload } from "./variants/confirmation";

export type PlannerModalPayload = EditTaskModalPayload | ConfirmationModalPayload;

export const useEditTaskModal = () => {
  return useModalContext<PlannerModalPayload>();
};

export const useConfirmationModal = () => {
  return useModalContext<PlannerModalPayload>();
};
