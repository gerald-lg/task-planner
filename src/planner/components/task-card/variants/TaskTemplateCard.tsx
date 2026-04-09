import type { Ref, SubmitEvent } from 'react';
import type { ColorType } from '../../../models/planner.types';
import { TaskCard } from '../TaskCard';


interface TaskTemplateCardProps {
    color: ColorType;
    id: string;
    title: string;
    duration?: number;
    onChange: (id: string, value: string) => void;
    onBlur: (id: string, value: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>, id: string) => void;
    refInput: Ref<HTMLInputElement>;
}

export const TaskTemplateCard = ({ color, id, title, duration, onChange, onBlur, onSubmit, refInput }: TaskTemplateCardProps) => {
  return (
    <TaskCard.Root color={color} key={id} id={id}>
        <div className="text-white">
            <TaskCard.InputTitle
                title={title}
                onChange={onChange}
                onSubmit={onSubmit}
                onBlur={onBlur}
                refInput={refInput}
            />
            <section className="flex flex-row items-center justify-end gap-2">
                <TaskCard.Duration duration={duration} />
            </section>
        </div>
    </TaskCard.Root>
  )
}