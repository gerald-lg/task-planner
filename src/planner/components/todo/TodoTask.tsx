import type { ColorType, TaskTemplate } from "@/planner/models"
import { TaskTemplateCard } from "../task-card";
import { usePlannerStore } from "@/planner/store/store";
import { memo } from "react";

interface TodoTaskProps {
    id: string;
    refInput: (el: HTMLInputElement | null) => void;
}

export const TodoTask = memo(({ id, refInput }: TodoTaskProps) => {

    const task = usePlannerStore((s) => s.templateTasks.find((t) => t.id === id));
    const plannedCount = usePlannerStore(
        (s) => s.plannedTasks.reduce(
            (acc, t) => (t.templateId === id ? acc + 1 : acc),
            0
        )
    );
   
    const color: ColorType = "sky";

    const changeTaskTitle = usePlannerStore((s) => s.changeTaskTitle);
    const discardTask = usePlannerStore((s) => s.discardTask);
    const saveTask = usePlannerStore((s) => s.saveTask);
    const editTemplateTask = usePlannerStore((s) => s.editTemplateTask);
    const deleteTasksByTemplateId = usePlannerStore((s) => s.deleteTasksByTemplateId);

    if(!task) return null;

    const onChangeTitle = (value: string) => {
        changeTaskTitle(id, value);
    }

    const onBlurTask = (value: string) => {
        if(value.trim() === ""){
            discardTask(id);
            return;
        }
        saveTask(id);
    }

    const onSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        saveTask(id);
    }

    const onEditTask = (values: Partial<TaskTemplate>) => {
        editTemplateTask(id, values);
    }
    const onDeleteTask = () => {
        deleteTasksByTemplateId(id);
        discardTask(id);
    }


    return (
        <TaskTemplateCard
            id={task.id}
            title={task.title}
            duration={task.duration}
            data={task}
            color={color}
            onChange={onChangeTitle}
            onBlur={onBlurTask}
            onSubmit={onSubmitTask}
            refInput={refInput}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            associatedPlannedCount={plannedCount}
        />
    )
})