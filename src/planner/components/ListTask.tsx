import { Children, type ReactNode } from "react";

export interface ListTasksTemplate {
    children?: ReactNode;
    counter: number;
    name: string;
    color?: "blue" | "green" | "red" | "yellow" | "transparent" | "sky";
    handleAddTask: () => void;
    handleMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const colorClasses = {
    blue: {
        section: "bg-blue-950",
        badge: "bg-blue-700",
    },
    green: {
        section: "bg-green-950",
        badge: "bg-green-700",
    },
    red: {
        section: "bg-red-950",
        badge: "bg-red-700",
    },
    yellow: {
        section: "bg-yellow-950",
        badge: "bg-yellow-700",
    },
    transparent: {
        section: "bg-transparent",
        badge: "bg-transparent",
    },
    sky: {
        section: "bg-sky-950",
        badge: "bg-sky-700",
    }
} as const;

export const ListTask = ({ children, counter, name, color, handleAddTask, handleMouseDown }: ListTasksTemplate) => {
    const sectionColorClass = color ? colorClasses[color].section : "";
    const badgeColorClass = color ? colorClasses[color].badge : "";

    const childrenWithColor = Children.map(children, (child) => (
        <div className={`${badgeColorClass} bg-opacity-50 p-2 rounded-md`}>
            {child}
        </div>
    ));

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
                {childrenWithColor}
            </section>
        </section>
    )
}