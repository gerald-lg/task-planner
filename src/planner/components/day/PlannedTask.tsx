import type { ColorType, PlannedTask as PlannedTaskType } from "@/planner/models";
import { TaskPlannedCard } from "../task-card";
import { usePlannerStore } from "@/planner/store/store";
import { memo } from "react";

interface PlannedTaskProps {
    id: string;
    previousId: string | null;
    nextId: string | null;
    color: ColorType;
}

export const PlannedTask = memo(({ id, previousId, nextId, color }: PlannedTaskProps) => {

    const task = usePlannerStore((s) => s.plannedTasks.find((t) => t.id === id));
    const templateTask = usePlannerStore((s) => s.templateTasks.find((t) => t.id === task?.templateId));

    const changePlannedTaskState = usePlannerStore((s) => s.changeTaskState);
    const deletePlannedTask = usePlannerStore((s) => s.deleteTask);
    const editPlannedTask = usePlannerStore((s) => s.editPlannedTask);
    const reorderPlannedTask = usePlannerStore((s) => s.reorderTask);

    const onMoveUp = () => {
        if (previousId) {
            reorderPlannedTask(id, previousId);
        }
    };

    const onMoveDown = () => {
        if (nextId) {
            reorderPlannedTask(id, nextId);
        }
    };

    const handleEditPlannedTask = (values: Partial<PlannedTaskType>) => {
        editPlannedTask(id, values);
    }

    if(!task || !templateTask) return null;

    return (
        <TaskPlannedCard
            task={task}
            title={templateTask.title}
            duration={templateTask.duration ?? 0}
            color={color}
            canMoveUp={previousId !== null}
            canMoveDown={nextId !== null}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onChangeState={changePlannedTaskState}
            onDelete={deletePlannedTask}
            onEdit={handleEditPlannedTask}
        />
    )
})