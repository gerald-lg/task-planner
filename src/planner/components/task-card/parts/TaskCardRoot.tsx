import { useDraggable } from "@dnd-kit/react";
import { GripVertical } from "lucide-react";

import { colorClasses } from "@planner/helpers";
import type { ColorType } from "@planner/models";
import { TaskCardProvider } from "./TaskCardContext";

interface TaskCardRootProps {
    id: string;
    children: React.ReactNode;
    color?: ColorType;
}

export const TaskCardRoot = ({ id, children, color }: TaskCardRootProps) => {

  const { ref } = useDraggable({ id });

  return (
    <TaskCardProvider value={{ id, color }}>
      <div
        className={`${color ? colorClasses[color].card : ""} bg-opacity-50 p-2 rounded-md touch-none flex items-start gap-1.5`}
        ref={ref}
      >
        <div className="shrink-0 cursor-grab active:cursor-grabbing select-none pt-0.5 text-white/30 hover:text-white/60 transition-colors">
          <GripVertical className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </TaskCardProvider>
  );
};

