import { useDraggable } from "@dnd-kit/react";

import { colorClasses } from "../../helpers";
import type { ColorType } from "../../models";
import { TaskCardProvider } from "./TaskCardContext";

interface TaskCardRootProps {
    id: string;
    children: React.ReactNode;
    color?: ColorType;
}

export const TaskCardRoot = ({ id, children, color }: TaskCardRootProps) => {

  const { ref } = useDraggable({
      id: id,
  });

  return (
    <TaskCardProvider value={{ id, color }}>
      <div className={`${color ? colorClasses[color].card : ""} bg-opacity-50 p-2 rounded-md`} ref={ref}>
        {children}
      </div>
    </TaskCardProvider>
  )
}

