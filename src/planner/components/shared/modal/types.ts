import type { ColorType, TaskTemplate, PlannedTask } from "@planner/models";


export type EditTaskModalPayload =
  | {
      kind: "template";
      color: ColorType;
      data: TaskTemplate;
    }
  | {
      kind: "planned";
      color: ColorType;
      data: PlannedTask & { title: string; duration?: number };
    };
