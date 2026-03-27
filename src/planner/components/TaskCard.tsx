import { stateTaskLabels } from "../models";

interface TaskCardProps {
    title: string;
    duration?: number;
    note?: string;
    state?: keyof typeof stateTaskLabels;

}

export const TaskCard = ({ title, duration, note, state }: TaskCardProps) => {
  return (
    <section>
        <div className="text-white">
          <input
            type="text"
            placeholder="Enter title..."
            className="text-xl font-bold text-white w-full placeholder:text-gray-100 focus:outline-none bg-transparent text-ellipsis whitespace-nowrap overflow-hidden"
            value={title}
          />
          { note && <p className="text-xs text-white text-ellipsis whitespace-nowrap overflow-hidden">{note}</p>}
          <section className="flex flex-row items-center justify-end gap-2">
            { state && <p className={`badge ${state}`}>{stateTaskLabels[state]}</p>}
            {duration && <p className="text-xs text-white">({duration} mins)</p>}
          </section>
        </div>
    </section>
  )
}