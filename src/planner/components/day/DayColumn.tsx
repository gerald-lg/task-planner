import { useShallow } from "zustand/shallow";
import { dayColumns } from "../../config";
import { usePlannerStore } from "../../store/store";
import type { Day } from "@/planner/models";

import { EmptyState, PlannedTask } from ".";
import { PlannerColumn } from "../PlannerColumn";

interface DayColumnProps {
    day: Day; 
}

export const DayColumn = ({ day }: DayColumnProps) => {

    const tasks = usePlannerStore(
        useShallow((s) =>
            s.plannedTasks.filter((t) => t.day === day).sort((a, b) => a.order - b.order)
        )
    );
    const config = dayColumns.find((c) => c.id === day)!;

    return (
        <PlannerColumn
            id={day}
            name={config.name}
            counter={tasks.length}
            color={config.color}
            className="w-full lg:w-72 lg:shrink-0"
        >
        {
            tasks.length === 0 ? (
                <EmptyState />
            ) : 
            (   
                tasks.map((task, index) => (
                    <PlannedTask
                        key={task.id}
                        id={task.id}
                        previousId={tasks[index - 1]?.id ?? null}
                        nextId={tasks[index + 1]?.id ?? null}
                        color={config.color}
                    />
                ))
            )
        }
        </PlannerColumn>
    )
    
}