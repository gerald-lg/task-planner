import type { Ref, SubmitEvent } from "react";
interface TaskCardInputTitleProps {
    onBlur: (value: string) => void;
    onChange: (value: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
    refInput: Ref<HTMLInputElement>;
    title: string;
}

export const TaskCardInputTitle = ({ refInput, title, onChange, onBlur, onSubmit }: TaskCardInputTitleProps) => {

  return (
    <form onSubmit={(e) => onSubmit(e)}>
        <input
            ref={refInput}
            name="title"
            type="text"
            placeholder="Enter title..."
            className="text-md font-semibold text-white w-full placeholder:text-gray-100 focus:outline-none bg-transparent text-ellipsis whitespace-nowrap overflow-hidden touch-auto"
            value={title}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onBlur(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
        />
    </form>
  )
}

