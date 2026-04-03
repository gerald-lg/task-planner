import type { Ref, SubmitEvent } from "react";
import { useDraggable } from "@dnd-kit/react";

import { type ColorType, type StateTask } from "../models";
import { colorClasses, typesStates } from "../helpers";

interface TaskCardProps {
    id: string;
    title: string;
    color?: ColorType;
    duration?: number;
    note?: string;
    state?: StateTask;
    onChange: (value: string, id: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>, id: string) => void;
    onBlur: (value: string, id: string) => void;
    refInput: Ref<HTMLInputElement>,
    onChangeState?: (id: string) => void;
}

export const TaskCard = ({ 
    id, 
    title,
    color, 
    duration, 
    note, 
    state, 
    onChange, 
    onSubmit,
    onBlur,
    refInput,
    onChangeState
  }: TaskCardProps) => {
  
  
  const { ref } = useDraggable({
    id: id,
  });

  return (
    <form className={`${color ? colorClasses[color].card : ""} bg-opacity-50 p-2 rounded-md`} ref={ref} onSubmit={(e) => onSubmit(e, id)}>
        <div className="text-white">
          <input
            ref={refInput}
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
            { state && <button onClick={() => onChangeState && onChangeState(id)} className={`badge ${state}`}>{typesStates[state].label}</button>}
            {duration && <p className="text-xs text-white">({duration} mins)</p>}
          </section>
        </div>
    </form>
  )
}