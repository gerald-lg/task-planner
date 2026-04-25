import type { Day, PlannedTask } from "@planner/models";
import { usePlannerStore } from "@planner/store/store";

export const usePlannedTask = () => {
    const plannedTasks = usePlannerStore((s) => s.plannedTasks);
    const addTask = usePlannerStore((s) => s.addTask);
    const moveTask = usePlannerStore((s) => s.moveTask);
    const changeTaskState = usePlannerStore((s) => s.changeTaskState);
    const deleteTask = usePlannerStore((s) => s.deleteTask);
    const editPlannedTask = usePlannerStore((s) => s.editPlannedTask);

    const createPlannedTask = (templateId: string, day: Day): PlannedTask => ({
        id: crypto.randomUUID(),
        templateId,
        day,
        order: 0,
        state: "todo",
    });

    return {
        plannedTasks,
        createPlannedTask,
        addTask,
        moveTask,
        changeTaskState,
        deleteTask,
        editPlannedTask,
    };
};
