import type { ColorType, PlannedTask } from "@planner/models"

import { TaskCard } from ".."
import { Pencil, Trash } from "lucide-react";
import { useEditTaskModal, type EditTaskModalPayload } from "@planner/components/shared/modal";

interface TaskPlannedCardProps {
  color: ColorType;
  task: PlannedTask;
  title: string;
  duration: number;
  onChangeState: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, values: Partial<PlannedTask>) => void;
}

const buildPlannedCardActions = (params: { id: string; onDelete: (id: string) => void; onEditModal: () => void }) => {
  return [
      {
          id: "edit",
          label: "Edit",
          icon: <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />,
          onClick: params.onEditModal,
      },
      {
          id: "delete",
          label: "Delete",
          icon: <Trash className="mr-2 h-4 w-4" aria-hidden="true" />,
          onClick: () => params.onDelete(params.id),
      },
  ];
}

export const TaskPlannedCard = ({color, task, title, duration, onChangeState, onDelete, onEdit }: TaskPlannedCardProps) => {

  const { openWith } = useEditTaskModal();

  const handleEditClick = () => {
      const payload: EditTaskModalPayload = {
          kind: "planned",
          color,
          data: { ...task, title, duration },
          onSubmit: onEdit,
      };
      openWith(payload);
  };

  const actions = buildPlannedCardActions({
      id: task.id,
      onDelete,
      onEditModal: handleEditClick,
  });

  return (
    <TaskCard.Root color={color} key={task.id} id={task.id}>
        <div className="text-white">
            <div className="flex flex-row items-start gap-1">
                <div className="min-w-0 flex-1">
                  <TaskCard.Title title={title} />
                </div>
                <div className="-mr-1 -mt-1 shrink-0 self-start">
                    <TaskCard.Dropdown actions={actions} />
                </div>
            </div>
            <TaskCard.Note note={task.note || ""} />
            <section className="flex flex-row items-center justify-end gap-2">
              <TaskCard.State state={task.state} onChangeState={onChangeState} />
              <TaskCard.Duration duration={duration} />
            </section>
        </div>
    </TaskCard.Root>
  );
}
