import type { StateTask } from "../models"

interface TaskCardProps {
    title: string;
    duration?: number;
    note?: string;
    state?: StateTask;
}

export const TaskCard = ({ title, duration }: TaskCardProps) => {
  return (
    <section>
        <div className="text-white">
          <h4 className="font-bold">{title}</h4>
          {duration && <p className="text-sm text-gray-500">Duration: {duration} mins</p>}
        </div>
    </section>
  )
}