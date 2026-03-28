import type { Ref, SubmitEvent } from "react";
import { stateTaskLabels } from "../models";

interface TaskCardProps {
    id: string;
    title: string;
    duration?: number;
    note?: string;
    state?: keyof typeof stateTaskLabels;
    onChange: (value: string, id: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>, id: string) => void;
    onBlur: (value: string, id: string) => void;
    ref: Ref<HTMLInputElement>
}

export const TaskCard = (
    { id, 
      title, 
      duration, 
      note, 
      state, 
      onChange, 
      onSubmit,
      onBlur,
      ref
    }: TaskCardProps) => {
  return (
    <form onSubmit={(e) => onSubmit(e, id)}>
        <div className="text-white">
          <input
            ref={ref}
            name="title"
            type="text"
            placeholder="Enter title..."
            className="text-md font-semibold text-white w-full placeholder:text-gray-100 focus:outline-none bg-transparent text-ellipsis whitespace-nowrap overflow-hidden"
            value={title}
            onChange={(e) => onChange(e.target.value, id)}
            onBlur={(e) => onBlur(e.target.value, id)}
          />
          { note && <p className="text-xs text-white text-ellipsis whitespace-nowrap overflow-hidden">{note}</p>}
          <section className="flex flex-row items-center justify-end gap-2">
            { state && <p className={`badge ${state}`}>{stateTaskLabels[state]}</p>}
            {duration && <p className="text-xs text-white">({duration} mins)</p>}
          </section>
        </div>
    </form>
  )
}