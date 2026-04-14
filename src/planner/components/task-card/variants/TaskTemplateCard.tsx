import type { Ref, SubmitEvent } from "react";
import { Pencil, Trash } from "lucide-react";

import type { ColorType, TaskTemplate } from "@planner/models";
import { Modal, EditTaskModalContent, useEditTaskModal, type EditTaskModalPayload } from "@planner/components/shared/modal";
import { TaskCard } from "../TaskCard";

interface TaskTemplateCardProps {
    color: ColorType;
    id: string;
    title: string;
    duration?: number;
    data: TaskTemplate;
    onChange: (id: string, value: string) => void;
    onBlur: (id: string, value: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>, id: string) => void;
    refInput: Ref<HTMLInputElement>;
    onEdit: (id: string, values: Partial<TaskTemplate>) => void;
    onDelete: (id: string) => void;
}

const buildTemplateCardActions = (params: {
    id: string;
    onDelete: (id: string) => void;
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
            onClick: () => params.onDelete(params.id),
        },
    ];
};

const TaskTemplateCardContent = ({ color, id, title, duration, onChange, onBlur, onSubmit, refInput, onEdit, onDelete, data }: TaskTemplateCardProps) => {
    const { openWith } = useEditTaskModal();

    const handleEditClick = () => {
        const payload: EditTaskModalPayload = {
            kind: "template",
            color,
            data,
            onSubmit: onEdit,
        };
        
        openWith(payload);
    };

    const actions = buildTemplateCardActions({
        id,
        onDelete,
        onEditModal: handleEditClick,
    });

    return (
        <>
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

            <Modal.Content>
                <EditTaskModalContent />
            </Modal.Content>
        </>
    );
};

export const TaskTemplateCard = (props: TaskTemplateCardProps) => {
    return (
        <Modal.Root>
            <TaskTemplateCardContent {...props} />
        </Modal.Root>
    );
};