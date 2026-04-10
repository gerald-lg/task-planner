import type { StateTask } from "@planner/models"

export const typesStates = {
    'todo': {
        slug: 'todo',
        label: 'Todo',
    },
    'in-progress': {
        slug: 'in-progress',
        label: 'In progress',
    },
    'done':{
        slug: 'done',
        label: 'Done'
    }
}

export const getNewState = (state: StateTask) => {

    const states = Object.keys(typesStates) as StateTask[];
    const currentIndex = states.findIndex(s => s === state);
    const nextIndex = (currentIndex + 1) % states.length;

    return states[nextIndex];
}