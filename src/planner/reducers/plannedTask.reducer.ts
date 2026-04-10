import { getNewState } from "@planner/helpers";
import type { Day, PlannedTask } from "@planner/models";

type PlannedTaskAction = 
  | { type: 'ADD_TASK'; payload: PlannedTask }
  | { type: 'MOVE_TASK'; payload: { id: string, day: Day} }
  | { type: 'CHANGE_TASK_STATE'; payload: { id: string } };


export const plannedTaskReducer = (state: PlannedTask[], action: PlannedTaskAction) => {

    switch(action.type){
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'MOVE_TASK':
            return state.map(task =>
                task.id === action.payload.id ? { ...task, day: action.payload.day } : task
            );
        case 'CHANGE_TASK_STATE':
            return state.map(task =>
                task.id === action.payload.id ? { ...task, state: getNewState(task.state) } : task
            );
        default:
            return state;
    }
}