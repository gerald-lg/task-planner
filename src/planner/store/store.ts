import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
	createPlannedTasksSlice,
	createTemplateTasksSlice,
	type PlannedTaskSlice,
	type TemplateTasksSlice,
} from "./slices";

export type PlannerStore = TemplateTasksSlice & PlannedTaskSlice;

export const usePlannerStore = create<PlannerStore>()(
	persist(
		(...a) => ({
			...createTemplateTasksSlice(...a),
			...createPlannedTasksSlice(...a),
		}),
		{
			name: "planner-store",
			version: 1,
			onRehydrateStorage: () => (_state, error) => {
				if (error) {
					// eslint-disable-next-line no-console
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
