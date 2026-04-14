import { dayColumns } from "@/planner/config";
import { typesStates } from "@/planner/helpers";
import type { Day, StateTask } from "@/planner/models";

type EditTaskKind = "template" | "planned";

type BasePayload = {
  title: string;
};

type TemplatePayload = BasePayload & {
  duration?: number;
};

type PlannedPayload = BasePayload & {
  day: Day;
  state: StateTask;
  note?: string;
};

type ValidationErrors = Partial<
  Record<"title" | "duration" | "day" | "state" | "note", string>
>;

type ValidationResult =
  | {
      success: true;
      data: TemplatePayload | PlannedPayload;
    }
  | {
      success: false;
      errors: ValidationErrors;
    };

const validDays = new Set(dayColumns.map((day) => day.id));
const validStates = new Set(
  Object.values(typesStates).map((state) => state.slug)
);

function getStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateEditTaskForm(
  formData: FormData,
  kind: EditTaskKind
): ValidationResult {
  const errors: ValidationErrors = {};

  const title = getStringValue(formData.get("title"));

  if (!title) {
    errors.title = "Title is required";
  } else if (title.length > 80) {
    errors.title = "Title must be 80 characters or less";
  }

  if (kind === "template") {
    const rawDuration = getStringValue(formData.get("duration"));

    let duration: number | undefined = undefined;

    if (rawDuration !== "") {
      const parsed = Number(rawDuration);

      if (!Number.isFinite(parsed) || parsed <= 0) {
        errors.duration = "Duration must be greater than 0";
      } else if (!Number.isInteger(parsed)) {
        errors.duration = "Duration must be a whole number";
      } else {
        duration = parsed;
      }
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
      };
    }

    return {
      success: true,
      data: {
        title,
        duration,
      },
    };
  }

  const rawDay = getStringValue(formData.get("day")) as Day;
  const rawState = getStringValue(formData.get("state")) as StateTask;
  const rawNote = getStringValue(formData.get("note"));

  if (!validDays.has(rawDay)) {
    errors.day = "Please select a valid day";
  }

  if (!validStates.has(rawState)) {
    errors.state = "Please select a valid state";
  }

  if (rawNote.length > 300) {
    errors.note = "Note must be 300 characters or less";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: {
      title,
      day: rawDay as Day,
      state: rawState as StateTask,
      note: rawNote || undefined,
    },
  };
}