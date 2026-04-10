import { type ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";

import { colorClasses } from "@planner/helpers";
import type { ColorType } from "@planner/models";

type PlannerColumnBaseProps = {
  id: string;
  children?: ReactNode;
  counter: number;
  name: string;
  color?: ColorType;
};

type PlannerColumnWithButton = PlannerColumnBaseProps & {
  showAddButton: true;
  handleAddTask: () => void;
  handleMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type PlannerColumnWithoutButton = PlannerColumnBaseProps & {
  showAddButton?: false;
  handleAddTask?: never;
  handleMouseDown?: never;
};

type PlannerColumnProps = PlannerColumnWithButton | PlannerColumnWithoutButton;

export const PlannerColumn = ({ children, counter, name, color, showAddButton, handleAddTask, handleMouseDown, id }: PlannerColumnProps) => {
    const sectionColorClass = color ? colorClasses[color].section : "";
    const badgeColorClass = color ? colorClasses[color].badge : "";

    const { ref, isDropTarget } = useDroppable({
        id: id,
    })

    return (
        <section ref={ref} className={`flex flex-col gap-2 p-4 w-2/5 rounded-lg ${sectionColorClass} ${isDropTarget ? "border-2 border-opacity-50 border-white" : " border-2 border-transparent"}`}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <h3 className={`p-1 rounded ${badgeColorClass} text-white`}>{ name }</h3>
                    <span className="text-sm text-white">{ counter }</span>
                </div>
                {  
                    showAddButton 
                    && <button onMouseDown={(e) => handleMouseDown(e)} onClick={handleAddTask} className="px-2 py-1 text-white">+</button> 
                }
            </div>
            <section className={`flex flex-col gap-3 p-2` }>
                {children}
            </section>
        </section>
    )
}