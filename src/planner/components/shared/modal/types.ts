import type { TaskTemplate, PlannedTask } from "@planner/models";


export type EditTaskModalPayload =
  | {
      kind: "template";
      data: TaskTemplate;
    }
  | {
      kind: "planned";
      data: PlannedTask & { title: string; color?: string; duration?: number };
    };
