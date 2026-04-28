import type { ColorType, PlannedTask } from "@planner/models"

import { TaskCard } from ".."
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";
import { useEditTaskModal, type EditTaskModalPayload } from "@planner/components/shared/modal";

interface TaskPlannedCardProps {
  color: ColorType;
  task: PlannedTask;
  title: string;
  duration: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onChangeState: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, values: Partial<PlannedTask>) => void;
}

type BuildActionsParams = {
  id: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: (id: string) => void;
  onEditModal: () => void;
};

const buildPlannedCardActions = (params: BuildActionsParams) => {
  return [
      {
          id: "move-up",
          label: "Subir",
          icon: <ChevronUp className="mr-2 h-4 w-4" aria-hidden="true" />,
          onClick: params.onMoveUp,
          disabled: !params.canMoveUp,
      },
      {
          id: "move-down",
          label: "Bajar",
          icon: <ChevronDown className="mr-2 h-4 w-4" aria-hidden="true" />,
          onClick: params.onMoveDown,
          disabled: !params.canMoveDown,
      },
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

export const TaskPlannedCard = ({
  color,
  task,
  title,
  duration,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onChangeState,
  onDelete,
  onEdit,
}: TaskPlannedCardProps) => {

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
      canMoveUp,
      canMoveDown,
      onMoveUp,
      onMoveDown,
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
