import { typesStates } from "@planner/helpers";
import type { StateTask } from "@planner/models";
import { useTaskCardContext } from "./TaskCardContext";

interface TaskCardStateProps {
    state: StateTask;
    onChangeState: (id: string) => void;
}


export const TaskCardState = ({ state, onChangeState }: TaskCardStateProps) => {
  const { id } = useTaskCardContext();

  return (
    <button 
        onClick={() => onChangeState(id)} 
        className={`badge ${state}`}
    >
        {typesStates[state].label}
    </button>
  )
}

