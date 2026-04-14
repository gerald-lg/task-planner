import { useModalContext } from "./parts/ModalContext";
import type { EditTaskModalPayload } from "./variants/edit-task";

export const useEditTaskModal = () => {
  return useModalContext<EditTaskModalPayload>();
};
