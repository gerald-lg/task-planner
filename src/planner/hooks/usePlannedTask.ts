import { useReducer } from "react";
import type { Day, PlannedTask } from "../models";
import { plannedTaskReducer } from "../reducers";

export const usePlannedTask = (initialState: PlannedTask[]) => {

    const [plannedTasks, dispatch] = useReducer(plannedTaskReducer, initialState);

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
        dispatch({ type: 'ADD_TASK', payload: task });
    }

    const onMovePlannedTask = (plannedTask: PlannedTask, new_day : Day) => {
        dispatch({ type: 'MOVE_TASK', payload: { id: plannedTask.id, day: new_day } });
    }

    const onChangeStatePlannedTask = (taskId: string) => {
        dispatch({ type: 'CHANGE_TASK_STATE', payload: { id: taskId } });
    }

    return {
        plannedTasks,
        createPlannedTask,
        onAddPlannedTask,
        onMovePlannedTask,
        onChangeStatePlannedTask,
    }
}