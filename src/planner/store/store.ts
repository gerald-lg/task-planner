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
			partialize: (state) => ({
				templateTasks: state.templateTasks,
				plannedTasks: state.plannedTasks,
			}),
		}
	)
);
