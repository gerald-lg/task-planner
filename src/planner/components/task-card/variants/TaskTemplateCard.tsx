import type { Ref, SubmitEvent } from "react";
import { Pencil, Trash } from "lucide-react";

import type { ColorType, TaskTemplate } from "@planner/models";
import { useConfirmationModal, useEditTaskModal, type EditTaskModalPayload } from "@planner/components/shared/modal";
import { TaskCard } from "../TaskCard";

interface TaskTemplateCardProps {
    color: ColorType;
    id: string;
    title: string;
    duration?: number;
    data: TaskTemplate;
    onChange: (value: string) => void;
    onBlur: (value: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
    refInput: Ref<HTMLInputElement>;
    onEdit: (values: Partial<TaskTemplate>) => void;
    onDelete: () => void;
    associatedPlannedCount: number;
}

const buildTemplateCardActions = (params: {
    onDeleteModal: () => void;
    onEditModal: () => void;
}) => {
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
            onClick: params.onDeleteModal,
        },
    ];
};

export const TaskTemplateCard = ({ color, id, title, duration, onChange, onBlur, onSubmit, refInput, onEdit, onDelete, data, associatedPlannedCount }: TaskTemplateCardProps) => {
    const { openWith } = useEditTaskModal();
    const { openWith: openConfirmationWith } = useConfirmationModal();

    const handleEditClick = () => {
        const payload: EditTaskModalPayload = {
            kind: "template",
            color,
            data,
            onSubmit: onEdit,
        };

        openWith(payload);
    };

    const handleDeleteClick = () => {
        const description = associatedPlannedCount > 0
            ? `Are you sure you want to delete this task? This action will also remove ${associatedPlannedCount} planned task(s) associated with it.`
            : "Are you sure you want to delete this task? This action cannot be undone.";

        openConfirmationWith({
            kind: "confirmation",
            variant: "warning",
            title: "Delete task",
            description,
            confirmLabel: "Delete",
            cancelLabel: "Cancel",
            onConfirm: onDelete,
        });
    };

    const actions = buildTemplateCardActions({
        onDeleteModal: handleDeleteClick,
        onEditModal: handleEditClick,
    });

    return (
        <TaskCard.Root color={color} key={id} id={id}>
            <div className="text-white">
                <div className="flex flex-row items-start gap-1">
                    <div className="min-w-0 flex-1">
                        <TaskCard.InputTitle
                            title={title}
                            onChange={onChange}
                            onSubmit={onSubmit}
                            onBlur={onBlur}
                            refInput={refInput}
                        />
                    </div>
                    <div className="-mr-1 -mt-1 shrink-0 self-start">
                        <TaskCard.Dropdown actions={actions} />
                    </div>
                </div>
                <section className="flex flex-row items-center justify-end gap-2">
                    <TaskCard.Duration duration={duration} />
                </section>
            </div>
        </TaskCard.Root>
    );
};
