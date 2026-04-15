import type { StateCreator } from 'zustand';

import { getNewState } from '@planner/helpers';
import type { Day, PlannedTask } from '@planner/models';

export interface PlannedTaskSlice {
    plannedTasks: PlannedTask[],
    addTask: (task: PlannedTask) => void;
    moveTask: (id: string, day: Day) => void;
    changeTaskState: (id: string) => void;
    deleteTask: (id: string) => void;
    deleteTasksByTemplateId: (templateId: string) => void;
    editPlannedTask: (id: string, values: Partial<PlannedTask>) => void;
}

export const createPlannedTasksSlice : StateCreator<PlannedTaskSlice> = (set) => ({
    plannedTasks: [],
    addTask: (task: PlannedTask) => set((state) => {
        return {
            plannedTasks: [...state.plannedTasks, task]
        }
    }),
    moveTask: (id: string, day: Day) => set((state) => {
        return {
            plannedTasks: state.plannedTasks.map((task) => 
                task.id === id
                ? { ...task, day }
                : task
            )
        }
    }),
    changeTaskState: (id: string) => set((state) => {
        return {
            plannedTasks: state.plannedTasks.map((task) => 
                task.id === id
                ? { ...task, state: getNewState(task.state)}
                : task
            )
        }
    }),
    deleteTask: (id: string) => set((state) => {
        return {
            plannedTasks: state.plannedTasks.filter((task) => task.id !== id)
        }
    }),
    deleteTasksByTemplateId: (templateId: string) => set((state) => {
        return {
            plannedTasks: state.plannedTasks.filter((task) => task.templateId !== templateId)
        }
    }),
    editPlannedTask: (id: string, values: Partial<PlannedTask>) => set((state) => {
        return {
            plannedTasks: state.plannedTasks.map((task) => 
                task.id === id
                ? { ...task, ...values }
                : task
            )
        }
    })

});