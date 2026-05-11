import { useRef } from "react";

import { usePlannerStore } from "@/planner/store/store"
import { PlannerColumn } from "../PlannerColumn"
import { generateId } from "@/planner/helpers/generateId";
import { useShallow } from "zustand/shallow";
import { EmptyState } from "./EmptyState";
import { TodoTask } from "./TodoTask";


export const TodoColumn = () => {
    const pendingFocusIDRef = useRef<string | null>(null);

    const taskIds = usePlannerStore(useShallow((s) => s.templateTasks.map((t) => t.id)));
    const addTaskDraft = usePlannerStore((s) => s.addTaskDraft);

    const handleAddTask = () => {
        const id = generateId();
        addTaskDraft(id);
        pendingFocusIDRef.current = id;
    }

    const focusTaskDraft = (e : React.MouseEvent<HTMLButtonElement>) => {
       e.preventDefault();
        const draftId = usePlannerStore.getState().templateTasks.find(t => t.isDraft)?.id;
        if (draftId) pendingFocusIDRef.current = draftId;
    }

    const refCallback = (id: string) => (el: HTMLInputElement | null) => {
        if (el && pendingFocusIDRef.current === id) {
            el.focus();
            pendingFocusIDRef.current = null;
        }
    };

    return (
        <PlannerColumn
            id="todo"
            name="To Do"
            counter={taskIds.length}
            color="sky"
            showAddButton={true}
            handleAddTask={handleAddTask}
            handleMouseDown={focusTaskDraft}
            className="w-full"
        >
            {
                taskIds.length === 0 ? <EmptyState /> 
                :
                taskIds.map((id) => (
                    <TodoTask
                        key={id}
                        id={id}
                        refInput={refCallback(id)}
                    />
                ))
            }
        </PlannerColumn>
        
    )
}