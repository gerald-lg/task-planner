import { useState } from "react";
import { colorClasses } from "@/planner/helpers/colors";
import { dayColumns } from "@/planner/config";
import { typesStates } from "@/planner/helpers";
import { useEditTaskModal } from "../../hooks";
import { validateEditTaskForm } from "./validateEditTaskForm";

export const EditTaskModalContent = () => {
  const { payload, close } = useEditTaskModal();
  const [errors, setErrors] = useState<
    Partial<Record<"title" | "duration" | "day" | "state" | "note", string>>
  >({});

  if (!payload || payload.kind === "confirmation") return null;

  const isTemplate = payload.kind === "template";
  const isPlanned = payload.kind === "planned";

  const colors = colorClasses[payload.color];
  const accentBg = colors.section;
  const buttonPrimaryClass = colors.buttonPrimary;
  const buttonSecondaryClass = colors.buttonSecondary;

  const labelClass = "mb-1.5 block text-sm font-medium text-slate-200";
  const inputClass = "w-full rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:bg-slate-800 focus:ring-4 focus:ring-white/5";
  const inputErrorClass = "border-red-400/60 focus:border-red-400 focus:ring-red-400/10";
  const selectClass = "w-full appearance-none rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition focus:border-slate-500 focus:bg-slate-800 focus:ring-4 focus:ring-white/5";
  const textareaClass = "w-full resize-none rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:bg-slate-800 focus:ring-4 focus:ring-white/5";

  const getFieldClass = (baseClass: string, field?: string) =>
    `${baseClass} ${field ? inputErrorClass : ""}`;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form with data:", new FormData(e.currentTarget));

    const formData = new FormData(e.currentTarget);
    const result = validateEditTaskForm(formData, payload.kind);

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});

    payload.onSubmit(payload.data.id, result.data);
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="text-left w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        <div className={`border-b border-black/10 px-6 py-5 ${accentBg}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Edit {payload.data.title}
              </h2>
              <p className="mt-1 text-sm text-white/70">
                Update the task details and save the changes.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className={labelClass}>
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                defaultValue={payload.data.title}
                className={getFieldClass(inputClass, errors.title)}
                placeholder="Task title"
                readOnly={payload.kind === "planned"}
              />
              {errors.title && (
                <p className="mt-1.5 text-sm text-red-300">{errors.title}</p>
              )}
            </div>

            {isTemplate && (
              <div>
                <label htmlFor="duration" className={labelClass}>
                  Duration (mins)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  defaultValue={payload.data.duration || ""}
                  className={getFieldClass(inputClass, errors.duration)}
                  placeholder="Ex: 45"
                />
                {errors.duration && (
                  <p className="mt-1.5 text-sm text-red-300">{errors.duration}</p>
                )}
              </div>
            )}

            {isPlanned && (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="day" className={labelClass}>
                      Day
                    </label>
                    <div className="relative">
                      <select
                        id="day"
                        name="day"
                        defaultValue={payload.data.day}
                        className={getFieldClass(selectClass, errors.day)}
                      >
                        {dayColumns.map((day) => (
                          <option
                            key={day.id}
                            value={day.id}
                            className="bg-slate-900 text-white"
                          >
                            {day.name}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                        ▾
                      </span>
                    </div>
                    {errors.day && (
                      <p className="mt-1.5 text-sm text-red-300">{errors.day}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className={labelClass}>
                      State
                    </label>
                    <div className="relative">
                      <select
                        id="state"
                        name="state"
                        defaultValue={payload.data.state}
                        className={getFieldClass(selectClass, errors.state)}
                      >
                        {Object.values(typesStates).map((state) => (
                          <option
                            key={state.slug}
                            value={state.slug}
                            className="bg-slate-900 text-white"
                          >
                            {state.label}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                        ▾
                      </span>
                    </div>
                    {errors.state && (
                      <p className="mt-1.5 text-sm text-red-300">{errors.state}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="note" className={labelClass}>
                    Note
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    defaultValue={payload.data.note || ""}
                    rows={4}
                    className={getFieldClass(textareaClass, errors.note)}
                    placeholder="Add a note for this task..."
                  />
                  {errors.note && (
                    <p className="mt-1.5 text-sm text-red-300">{errors.note}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={close}
              className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99] ${buttonSecondaryClass}`}
            >
              Close
            </button>

            <button
              type="submit"
              className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] active:scale-[0.99] ${buttonPrimaryClass}`}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};