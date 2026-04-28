import type { StateCreator } from "zustand";
import type { TaskTemplate } from "@planner/models";


export interface TemplateTasksSlice {
    templateTasks: TaskTemplate[];
    addTaskDraft: (id: string) => void;
    changeTaskTitle: (id: string, title: string) => void;
    saveTask: (id: string) => void;
    discardTask: (id: string) => void;
    editTemplateTask: (id: string, values: Partial<TaskTemplate>) => void;
}

const initialTasks: TaskTemplate[] = [];

export const createTemplateTasksSlice : StateCreator<TemplateTasksSlice> = (set) => ({
    templateTasks: initialTasks,
    addTaskDraft: (id: string) => set((state) => {
        if(state.templateTasks.some((task) => task.isDraft)){
            return state;
        }
        return {
            templateTasks: [
                ...state.templateTasks,
                {
                    id,
                    title: '',
                    isDraft: true,
                }
            ]
        }
        
    }),
    changeTaskTitle: (id: string, title:string) => set((state) => {
        return {
            templateTasks: state.templateTasks.map((task) => 
                task.id === id 
                ? { ...task, title: title}
                : task
            )
        }
    }),
    saveTask: (id: string) => set((state) => {
        return {
            templateTasks: state.templateTasks.map((task) => 
                task.id === id
                ? { ...task, isDraft: false}
                : task
            )
        }
    }),
    discardTask: (id: string) => set((state) => {
        return {
            templateTasks: state.templateTasks.filter((task) => task.id !== id)
        }
    }),
    editTemplateTask: (id: string, values: Partial<TaskTemplate>) => set((state) => {
        return {
            templateTasks: state.templateTasks.map((task) => 
                task.id === id
                ? { ...task, ...values }
                : task
            )
        }
    })

})