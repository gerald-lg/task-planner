import { useMemo, useState, type SubmitEvent } from "react";
import type { TaskTemplate } from "@planner/models";
import { generateId } from "@planner/helpers";
import { usePlannerStore } from "@planner/store/store";


export const useTemplateTask = () => {

    const tasks = usePlannerStore((s) => s.templateTasks);
    const plannedTasks = usePlannerStore((s) => s.plannedTasks);
    const addTaskDraft = usePlannerStore((s) => s.addTaskDraft);
    const changeTaskTitle = usePlannerStore((s) => s.changeTaskTitle);
    const discardTask = usePlannerStore((s) => s.discardTask);
    const saveTask = usePlannerStore((s) => s.saveTask);
    const editTemplateTask = usePlannerStore((s) => s.editTemplateTask);
    const deleteTasksByTemplateId = usePlannerStore((s) => s.deleteTasksByTemplateId);
    const [pendingFocusID, setPendingFocusID] = useState<string|null>(null);

    const handleAddTask = () => {
        const id = generateId();
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

    const handleDeleteTask = (id: string) => {
        deleteTasksByTemplateId(id);
        discardTask(id);
    }

    const handleEditTask = (id: string, values: Partial<TaskTemplate>) => {
        editTemplateTask(id, values);
    }

    const associatedPlannedCountByTemplateId = useMemo(() => {
        return plannedTasks.reduce<Record<string, number>>((acc, task) => {
            acc[task.templateId] = (acc[task.templateId] ?? 0) + 1;
            return acc;
        }, {});
    }, [plannedTasks]);

    const getTaskById = (id: string) => {
        return tasks.find((task) => task.id === id) || null;
    }

    const getAttributeTask = <K extends keyof TaskTemplate>(
        id: string,
        attribute: K,
    ): TaskTemplate[K] | null => {
        const task = getTaskById(id);
        return task ? task[attribute] : null;
    }

    const getPlannedCount = (templateId: string) => {
        return associatedPlannedCountByTemplateId[templateId] ?? 0;
    }

    return {
        // variables
        tasks,
        pendingFocusID,
        // handlers
        focusTaskDraft,
        getAttributeTask,
        getPlannedCount,
        getTaskById,
        handleAddTask,
        handleChangeTask,
        handleDeleteTask,
        handleOnBlurTask,
        handleSubmitTask,
        handleEditTask,
        setPendingFocusID,
    }
}