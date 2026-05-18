import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
	createPlannedTasksSlice,
	createTemplateTasksSlice,
	createToastSlice,
	type PlannedTaskSlice,
	type TemplateTasksSlice,
	type ToastSlice,
} from "./slices";

export type PlannerStore = TemplateTasksSlice & PlannedTaskSlice & ToastSlice;

export const usePlannerStore = create<PlannerStore>()(
	persist(
		(...a) => ({
			...createTemplateTasksSlice(...a),
			...createPlannedTasksSlice(...a),
			...createToastSlice(...a)
		}),
		{
			name: "planner-store",
			version: 1,
			onRehydrateStorage: () => (_state, error) => {
				if (error) {
					console.error("[planner-store] rehydration failed:", error);
				}
			},
			partialize: (state) => ({
				templateTasks: state.templateTasks,
				plannedTasks: state.plannedTasks,
			}),
		}
	)
);
