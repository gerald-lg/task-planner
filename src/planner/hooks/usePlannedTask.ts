import { useStore } from "zustand";

import type { Day, PlannedTask } from "../models";
import { usePlannerStore } from "../store/store";

export const usePlannedTask = () => {

    const { plannedTasks, addTask, moveTask, changeTaskState } = useStore(usePlannerStore);

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

    return {
        plannedTasks,
        createPlannedTask,
        onAddPlannedTask,
        onMovePlannedTask,
        onChangeStatePlannedTask,
    }
}