
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
    <p className="text-xs text-gray-200 text-left text-ellipsis whitespace-nowrap overflow-hidden mb-2">{note}</p>
  )
}

