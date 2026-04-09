import { useTaskCardContext } from "./TaskCardContext";

interface TaskCardTitleProps {
    title: string;
}

export const TaskCardTitle = ({ title }: TaskCardTitleProps) => {
  useTaskCardContext();

  return (
    <p className="text-md text-left font-semibold text-white w-full text-ellipsis whitespace-nowrap overflow-hidden">
        {title}
    </p>
  )
}

