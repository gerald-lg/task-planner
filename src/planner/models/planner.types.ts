import { colorClasses, typesStates } from "@planner/helpers";

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type StateTask = keyof typeof typesStates;

export interface TaskTemplate {
  id: string;
  title: string;
  color?: ColorType;
  duration?: number;
  isDraft: boolean;
}

export interface PlannedTask {
  id: string;
  templateId: string;
  day: Day;
  order: number;
  note?: string;
  state: StateTask;
}

export interface PlannerState {
  templates: TaskTemplate[];
  plannedTasks: PlannedTask[];
}

export type ColorType = keyof typeof colorClasses;

export const colorTypes = Object.keys(colorClasses) as ColorType[];

export type MomentDay = "morning" | "afternoon" | "evening" | "night";