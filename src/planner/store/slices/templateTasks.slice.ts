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

const initialTasks: TaskTemplate[] = [
  { id: '1', title: 'Task 1', duration: 30, isDraft: false },
  { id: '2', title: 'Task 2', duration: 45, isDraft: false },
  { id: '3', title: 'Task 3', duration: 60, isDraft: false },
  { id: '4', title: 'Task 4', duration: 15, isDraft: false },
];

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