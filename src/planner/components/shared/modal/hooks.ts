import { useModalContext } from "./parts/ModalContext";
import type { EditTaskModalPayload } from "./types";

export const useEditTaskModal = () => {
  return useModalContext<EditTaskModalPayload>();
};
