import type { StateCreator } from 'zustand';

import { getNewState } from '@planner/helpers';
import type { Day, PlannedTask } from '@planner/models';

export interface PlannedTaskSlice {
    plannedTasks: PlannedTask[],
    addTask: (task: PlannedTask) => void;
    moveTask: (id: string, day: Day) => void;
    reorderTask: (id: string, targetId: string) => void;
    changeTaskState: (id: string) => void;
    deleteTask: (id: string) => void;
    deleteTasksByTemplateId: (templateId: string) => void;
    editPlannedTask: (id: string, values: Partial<PlannedTask>) => void;
}

const insertAtPosition = (
    tasks: PlannedTask[],
    task: PlannedTask,
    day: Day,
    idx: number,
): PlannedTask[] => {
    const prev = tasks.find((t) => t.id === task.id);
    const prevDay = prev?.day;
    const daysToRenumber = new Set<Day>([day]);
    if (prevDay && prevDay !== day) daysToRenumber.add(prevDay);

    const untouched = tasks.filter(
        (t) => !daysToRenumber.has(t.day) && t.id !== task.id,
    );

    // día destino
    const targetDay = tasks
        .filter((t) => t.day === day && t.id !== task.id)
        .sort((a, b) => a.order - b.order);
        
    const calcID = Math.max(0, Math.min(idx, targetDay.length));
    targetDay.splice(calcID, 0, { ...task, day });

    const targetDayRenumbered = targetDay.map((t, i) => ({ ...t, order: i }));

    // día origen (si cambia)
    const originDayRenumbered =
        prevDay && prevDay !== day
            ? tasks
                .filter((t) => t.day === prevDay && t.id !== task.id)
                .sort((a, b) => a.order - b.order)
                .map((t, i) => ({ ...t, order: i }))
            : [];

    return [...untouched, ...targetDayRenumbered, ...originDayRenumbered];
};

const appendToDay = (
    tasks: PlannedTask[],
    task: PlannedTask,
    day: Day,
): PlannedTask[] => {
    const sameDayCount = tasks.filter(
        (t) => t.day === day && t.id !== task.id,
    ).length;
    return insertAtPosition(tasks, task, day, sameDayCount);
};

export const createPlannedTasksSlice: StateCreator<PlannedTaskSlice> = (set) => ({
    plannedTasks: [],

    addTask: (task) => set((state) => ({
        plannedTasks: appendToDay(state.plannedTasks, task, task.day),
    })),

    moveTask: (id, day) => set((state) => {
        const task = state.plannedTasks.find((t) => t.id === id);
        if (!task) return state;
        return { plannedTasks: appendToDay(state.plannedTasks, task, day) };
    }),

    reorderTask: (id, targetId) => set((state) => {
        if (id === targetId) return state;
        const task = state.plannedTasks.find((t) => t.id === id);
        const target = state.plannedTasks.find((t) => t.id === targetId);
        if (!task || !target) return state;

        return {
            plannedTasks: insertAtPosition(
                state.plannedTasks,
                task,
                target.day,
                target.order,
            ),
        };
    }),

    changeTaskState: (id) => set((state) => ({
        plannedTasks: state.plannedTasks.map((task) =>
            task.id === id ? { ...task, state: getNewState(task.state) } : task,
        ),
    })),

    deleteTask: (id) => set((state) => {
        const task = state.plannedTasks.find((t) => t.id === id);
        if (!task) return state;

        const otherDays = state.plannedTasks.filter(
            (t) => t.day !== task.day && t.id !== id,
        );
        const sameDay = state.plannedTasks
            .filter((t) => t.day === task.day && t.id !== id)
            .sort((a, b) => a.order - b.order)
            .map((t, i) => ({ ...t, order: i }));

        return { plannedTasks: [...otherDays, ...sameDay] };
    }),

    deleteTasksByTemplateId: (templateId) => set((state) => {
        const remaining = state.plannedTasks.filter(
            (t) => t.templateId !== templateId,
        );
        
        const days = Array.from(new Set(remaining.map((t) => t.day))) as Day[];
        const renumbered = days.flatMap((day) =>
            remaining
                .filter((t) => t.day === day)
                .sort((a, b) => a.order - b.order)
                .map((t, i) => ({ ...t, order: i })),
        );
        return { plannedTasks: renumbered };
    }),

    editPlannedTask: (id, values) => set((state) => ({
        plannedTasks: state.plannedTasks.map((task) =>
            task.id === id ? { ...task, ...values } : task,
        ),
    })),
});
