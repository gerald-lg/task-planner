import { useCallback } from "react";
import { usePlannerStore } from "@/planner/store/store";
import { useToast } from "@planner/components";
import { dayColumns } from "@planner/config";
import type { Day } from "@planner/models";
import { generateId } from "@planner/helpers";

export const useDragEnd = () => {
  const { show } = useToast();

  return useCallback((sourceId: string, targetId?: string) => {
    if (!targetId || !dayColumns.some((c) => c.id === targetId)) return;

    const { plannedTasks, addTask, moveTask } = usePlannerStore.getState();
    const sourcePlanned = plannedTasks.find((t) => t.id === sourceId);

    if (sourcePlanned) {
      if (sourcePlanned.day !== targetId) {
        moveTask(sourcePlanned.id, targetId as Day);
        show("Task moved successfully", "success", { duration: 2000 });
      }
      return;
    }

    addTask({
      id: generateId(),
      templateId: sourceId,
      day: targetId as Day,
      order: 0,
      state: "todo",
    });
    show("Task added successfully", "success", { duration: 2000 });
  }, [show]);
};