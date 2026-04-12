import { colorClasses } from "@/planner/helpers/colors";
import { useEditTaskModal } from "../hooks";

export const EditTaskModalContent = () => {
  const { payload, close } = useEditTaskModal();

  if (!payload) {
    return null;
  }

  const isTemplate = payload.kind === "template";
  const isPlanned = payload.kind === "planned";

  const colors = colorClasses[payload.color];
  const bg = colors.section;
  const buttonPrimaryClass = colors.buttonPrimary;
  const buttonSecondaryClass = colors.buttonSecondary;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`w-full max-w-md rounded-lg p-6 shadow-lg ${bg} text-left`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            { `Edit ${payload.data.title}` }
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              type="text"
              defaultValue={payload.data.title}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500"
            />
          </div>

          {isTemplate && (
            <>
              <div>
                <label className="block text-sm font-medium text-white">
                  Duration (mins)
                </label>
                <input
                  type="number"
                  defaultValue={payload.data.duration || ""}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500"
                />
              </div>
            </>
          )}

          {isPlanned && (
            <>
              <div>
                <label className="block text-sm font-medium text-white">
                  Day
                </label>
                <input
                  type="text"
                  defaultValue={payload.data.day}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  State
                </label>
                <input
                  type="text"
                  defaultValue={payload.data.state}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Note
                </label>
                <textarea
                  defaultValue={payload.data.note || ""}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-white"
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={close}
            className={`flex-1 rounded-md border ${buttonSecondaryClass} px-4 py-2 text-sm font-medium text-white`}
          >
            Close
          </button>
          <button
            onClick={() => {}}
            className={`flex-1 rounded-md ${buttonPrimaryClass} px-4 py-2 text-sm font-medium text-white`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
