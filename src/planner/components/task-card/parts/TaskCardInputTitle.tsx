import type { Ref, SubmitEvent } from "react";

import { useTaskCardContext } from "./TaskCardContext";

interface TaskCardInputTitleProps {
    onBlur: (value: string, id: string) => void;
    onChange: (value: string, id: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>, id: string) => void;
    refInput: Ref<HTMLInputElement>;
    title: string;
}

export const TaskCardInputTitle = ({ refInput, title, onChange, onBlur, onSubmit }: TaskCardInputTitleProps) => {
  const { id } = useTaskCardContext();

  return (
    <form onSubmit={(e) => onSubmit(e, id)}>
        <input
            ref={refInput}
            name="title"
            type="text"
            placeholder="Enter title..."
            className="w-full rounded-lg border border-white/30 bg-white/10 px-2 py-1 text-md font-semibold text-white placeholder:text-gray-200 text-ellipsis whitespace-nowrap overflow-hidden shadow-sm transition focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
            value={title}
            onChange={(e) => onChange(e.target.value, id)}
            onBlur={(e) => onBlur(e.target.value, id)}
        />
    </form>
  )
}

