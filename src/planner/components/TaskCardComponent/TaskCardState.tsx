import { typesStates } from "../../helpers";
import type { StateTask } from "../../models";
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

