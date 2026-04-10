import type { Ref, SubmitEvent } from "react";
import { Pencil, Trash } from "lucide-react";

import type { ColorType } from "@planner/models";
import { TaskCard } from "../TaskCard";


interface TaskTemplateCardProps {
    color: ColorType;
    id: string;
    title: string;
    duration?: number;
    onChange: (id: string, value: string) => void;
    onBlur: (id: string, value: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>, id: string) => void;
    refInput: Ref<HTMLInputElement>;
    onEdit: (id:string) => void;
    onDelete: (id:string) => void;
}

const buildTemplateCardActions = ({ id, onDelete, onEdit}: Pick<TaskTemplateCardProps, "id" | "onDelete" | "onEdit">) => {
    return [
        {
            id: "edit",
            label: "Edit",
            icon: <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />,
            onClick: () => onEdit(id),
        },
        {
            id: "delete",
            label: "Delete",
            icon: <Trash className="mr-2 h-4 w-4" aria-hidden="true" />,
            onClick: () => onDelete(id),
        },
    ];
};

export const TaskTemplateCard = ({ color, id, title, duration, onChange, onBlur, onSubmit, refInput, onEdit, onDelete }: TaskTemplateCardProps) => {
    const actions = buildTemplateCardActions({ id, onDelete, onEdit });

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