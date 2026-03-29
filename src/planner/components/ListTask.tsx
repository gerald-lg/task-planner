import { type ReactNode } from "react";

import type { ColorType } from "../models";
import { colorClasses } from "../helpers";


export interface ListTasksTemplate {
    children?: ReactNode;
    counter: number;
    name: string;
    color?: ColorType;
    handleAddTask: () => void;
    handleMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ListTask = ({ children, counter, name, color, handleAddTask, handleMouseDown }: ListTasksTemplate) => {
    const sectionColorClass = color ? colorClasses[color].section : "";
    const badgeColorClass = color ? colorClasses[color].badge : "";

    return (
        <section className={`flex flex-col gap-2 p-4 w-2/5 rounded-lg ${sectionColorClass}`}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <h3 className={`p-1 rounded ${badgeColorClass} text-white`}>{ name }</h3>
                    <span className="text-sm text-white">{ counter }</span>
                </div>
                <button onMouseDown={(e) => handleMouseDown(e)} onClick={handleAddTask} className="px-2 py-1 text-white">+</button>
            </div>
            <section className={`flex flex-col gap-3 p-2` }>
                {children}
            </section>
        </section>
    )
}