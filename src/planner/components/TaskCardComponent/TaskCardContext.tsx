import { createContext, useContext } from "react";

import type { ColorType } from "../../models";

type TaskCardContextValue = {
  id: string;
  color?: ColorType;
};

const TaskCardContext = createContext<TaskCardContextValue | null>(null);

export const TaskCardProvider = TaskCardContext.Provider;

export const useTaskCardContext = () => {
  const context = useContext(TaskCardContext);

  if (!context) {
    throw new Error("TaskCard compound components must be used inside TaskCard.Root.");
  }

  return context;
};
