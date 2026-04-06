import { useState, type SubmitEvent } from "react";
import type { TaskTemplate } from "../models";
import { useStore } from "zustand";
import { usePlannerStore } from "../store/store";


export const useTemplateTask = () => {

    const { templateTasks : tasks, addTaskDraft, changeTaskTitle, discardTask, saveTask} = useStore(usePlannerStore);
    const [pendingFocusID, setPendingFocusID] = useState<string|null>(null);

    const handleAddTask = () => {
        const id = crypto.randomUUID();
        addTaskDraft(id);
        setPendingFocusID(id);
    }

    const focusTaskDraft = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const draftTask = tasks.find((task) => task.isDraft);
        if(draftTask){
            setPendingFocusID(draftTask.id);
        }
    }

    const handleChangeTask = (value: string, id: string) => {
        changeTaskTitle(id, value);
    }

    const handleOnBlurTask = (value: string, id: string) => {
        if(value.trim() === ""){
            discardTask(id);
        }
        else{
            saveTask(id);
        }
    }

    const handleSubmitTask = (e:SubmitEvent<HTMLFormElement>, id:string) => {
        e.preventDefault();
        saveTask(id);
    }

    const getTaskById = (id: string) => {
        return tasks.find((task) => task.id === id) || null;
    }

    const getAttributeTask = (id: string, attribute: keyof TaskTemplate) => {
        const task = getTaskById(id);
        return task ? task[attribute] : null;
    }

    return {
        // variables
        tasks,
        pendingFocusID,
        // handlers
        focusTaskDraft,
        getTaskById,
        handleAddTask,
        handleChangeTask,
        handleOnBlurTask,
        handleSubmitTask,
        setPendingFocusID,
        getAttributeTask,
    }
}