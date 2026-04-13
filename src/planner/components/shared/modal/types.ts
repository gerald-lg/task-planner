import type { ColorType, TaskTemplate, PlannedTask } from "@planner/models";

export type EditTaskModalPayload =
  | {
      kind: "template";
      color: ColorType;
      data: TaskTemplate;
      onSubmit: (id: string) => void;
    }
  | {
      kind: "planned";
      color: ColorType;
      data: PlannedTask & { title: string; duration?: number };
      onSubmit: (id: string) => void;
    };
