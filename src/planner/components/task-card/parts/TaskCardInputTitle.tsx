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
            className="text-md font-semibold text-white w-full placeholder:text-gray-100 focus:outline-none bg-transparent text-ellipsis whitespace-nowrap overflow-hidden"
            value={title}
            onChange={(e) => onChange(e.target.value, id)}
            onBlur={(e) => onBlur(e.target.value, id)}
        />
    </form>
  )
}

