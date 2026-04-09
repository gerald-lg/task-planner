
import { useTaskCardContext } from "./TaskCardContext";

interface TaskCardNoteProps {
    note?: string;
}

export const TaskCardNote = ({ note }: TaskCardNoteProps) => {
  useTaskCardContext();

  if (!note) {
    return null;
  }

  return (
    <p className="text-xs text-white text-ellipsis whitespace-nowrap overflow-hidden">{note}</p>
  )
}

