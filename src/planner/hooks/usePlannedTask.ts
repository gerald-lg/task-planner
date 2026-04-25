import type { Day, PlannedTask } from "@planner/models";
import { usePlannerStore } from "@planner/store/store";

export const usePlannedTask = () => {

    const plannedTasks = usePlannerStore((s) => s.plannedTasks);
    const addTask = usePlannerStore((s) => s.addTask);
    const moveTask = usePlannerStore((s) => s.moveTask);
    const changeTaskState = usePlannerStore((s) => s.changeTaskState);
    const deleteTask = usePlannerStore((s) => s.deleteTask);
    const editPlannedTask = usePlannerStore((s) => s.editPlannedTask);

    const createPlannedTask = (templateId: string, day: Day): PlannedTask => {
        return {
            id: crypto.randomUUID(),
            templateId,
            day: day,
            order: 0,
            state: "todo",
        }
    }

    const onAddPlannedTask = (task: PlannedTask) => {
        addTask(task);
    }

    const onMovePlannedTask = (plannedTask: PlannedTask, new_day : Day) => {
        moveTask(plannedTask.id, new_day);
    }

    const onChangeStatePlannedTask = (taskId: string) => {
        changeTaskState(taskId);
    }

    const onDeletePlannedTask = (taskId: string) => {
        deleteTask(taskId);
    }

    const onEditPlannedTask = (id: string, values: Partial<PlannedTask>) => {
        editPlannedTask(id, values);
    }

    return {
        createPlannedTask,
        onAddPlannedTask,
        onChangeStatePlannedTask,
        onDeletePlannedTask,
        onMovePlannedTask,
        onEditPlannedTask,
        plannedTasks,
    }
}