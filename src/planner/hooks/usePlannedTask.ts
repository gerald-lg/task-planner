import { useStore } from "zustand";

import type { Day, PlannedTask } from "@planner/models";
import { usePlannerStore } from "@planner/store/store";

export const usePlannedTask = () => {

    const { plannedTasks, addTask, moveTask, changeTaskState, deleteTask } = useStore(usePlannerStore);

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

    return {
        createPlannedTask,
        onAddPlannedTask,
        onChangeStatePlannedTask,
        onDeletePlannedTask,
        onMovePlannedTask,
        plannedTasks,
    }
}