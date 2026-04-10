import type { TaskTemplate } from "@planner/models";

type TemplateTaskAction =
  | { type: 'ADD_TASK_DRAFT'; payload: { id: string } }
  | { type: 'CHANGE_TASK_TITLE'; payload: { id: string; title: string } }
  | { type: 'SAVE_TASK'; payload: { id: string } }
  | { type: 'DISCARD_TASK'; payload: { id: string } };

export const templateTaskReducer = (state: TaskTemplate[], action: TemplateTaskAction) => {

    switch(action.type){
        case 'ADD_TASK_DRAFT':
            if(state.some((task) => task.isDraft)){
                return state;
            }
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: '',
                    isDraft: true,
                },
            ];
        case 'CHANGE_TASK_TITLE':
            return state.map((task) =>
                task.id === action.payload.id
                ? { ...task, title: action.payload.title }
                : task
            );
        case 'SAVE_TASK':
            return state.map((task) =>
                task.id === action.payload.id
                ? { ...task, isDraft: false }
                : task
            );
        case 'DISCARD_TASK':
            return state.filter((task) => task.id !== action.payload.id);
        default:
            return state;
    }
}