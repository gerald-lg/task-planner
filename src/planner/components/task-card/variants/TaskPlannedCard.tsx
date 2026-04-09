import { TaskCard } from ".."
import type { ColorType, PlannedTask } from "../../../models"

interface TaskPlannedCardProps {
    color: ColorType;
    task: PlannedTask;
    title: string;
    duration: number;
    onChangeState: (id: string) => void;
}

export const TaskPlannedCard = ({ color, task, title, duration, onChangeState }: TaskPlannedCardProps) => {
  return (
    <TaskCard.Root color={color} key={task.id} id={task.id}>
        <div className="text-white">
            <TaskCard.Title title={title} />
            <TaskCard.Note note={task.note || ""} />
            <section className="flex flex-row items-center justify-end gap-2">
            <TaskCard.State state={task.state} onChangeState={onChangeState} />
            <TaskCard.Duration duration={duration} />
            </section>
        </div>
    </TaskCard.Root>
  )
}