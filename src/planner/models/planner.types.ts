export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type StateTask = "todo" | "in-progress" | "done";

export interface TaskTemplate {
  id: string;
  title: string;
  color?: string;
  duration?: number;
}

export interface PlannedTask {
  id: string;
  templateId: string;
  day: Day;
  order: number;
  note?: string;
  state: StateTask;
}