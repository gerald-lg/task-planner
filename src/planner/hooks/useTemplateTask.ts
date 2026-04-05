import { useReducer, useState, type SubmitEvent } from "react";
import type { TaskTemplate } from "../models";
import { templateTaskReducer } from "../reducers";


export const useTemplateTask = (initialState: TaskTemplate[]) => {
    const [tasks, dispatch] = useReducer(templateTaskReducer, initialState);
    const [pendingFocusID, setPendingFocusID] = useState<string|null>(null);
      

    const handleAddTask = () => {
        const id = crypto.randomUUID();
        dispatch({ type: 'ADD_TASK_DRAFT', payload: { id } });
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
        dispatch({ type: 'CHANGE_TASK_TITLE', payload: { id, title: value } }); 
    }

    const handleOnBlurTask = (value: string, id: string) => {
        if(value.trim() === ""){
            dispatch({ type: 'DISCARD_TASK', payload: { id } });
        }
        else{
            dispatch({ type: 'SAVE_TASK', payload: { id } });
        }
    }

    const handleSubmitTask = (e:SubmitEvent<HTMLFormElement>, id:string) => {
        e.preventDefault();
        dispatch({ type: 'SAVE_TASK', payload: { id } });
    }

    const handleDeleteTask = (id: string) => {
        dispatch({ type: 'DISCARD_TASK', payload: { id } });
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
        getAttributeTask,
        getTaskById,
        handleAddTask,
        handleChangeTask,
        handleDeleteTask,
        handleOnBlurTask,
        handleSubmitTask,
        setPendingFocusID,
    }
}