
import { useEffect, useRef } from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import { PlannerColumn } from './planner/components';
import type { Day } from './planner/models';
import { usePlannedTask, useTemplateTask } from './planner/hooks';
import { dayColumns } from './planner/config';

import './App.css'
import { getMomentDay } from './planner/helpers/planner';
import { TaskPlannedCard, TaskTemplateCard } from './planner/components';

function App() {

  const { 
    tasks, 
    pendingFocusID,
    handleAddTask,
    focusTaskDraft,
    handleChangeTask,
    handleOnBlurTask,
    handleSubmitTask,
    setPendingFocusID,
    getAttributeTask,
  } = useTemplateTask();

  const { 
    plannedTasks,
    createPlannedTask,
    onAddPlannedTask,
    onMovePlannedTask,
    onChangeStatePlannedTask 
  } = usePlannedTask();

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const greeting = `Good ${getMomentDay()}`;

  const handleDragEnd = (taskId: string, targetId?: string) => {
    if (!targetId || !dayColumns.some((column) => column.id === targetId)) {
      return;
    }

    const plannedTask = plannedTasks.find((task) => task.id === taskId);

    if (plannedTask) {
      if (plannedTask.day !== targetId) {
        onMovePlannedTask(plannedTask, targetId as Day);
      }

      return;
    }

    const newTask = createPlannedTask(taskId, targetId as Day);
    onAddPlannedTask(newTask);
  };
  
  useEffect(() => {
    if(pendingFocusID){
      inputRefs.current[pendingFocusID]?.focus();
      setPendingFocusID(null);
    }
  }, [pendingFocusID])

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-left">{greeting}</h1>
      <div className="flex flex-row gap-4">
        <DragDropProvider
          onDragEnd={(event) => {
            const { operation } = event;
            const { source, target } = operation;
            if (!source) {
              return;
            }
            handleDragEnd(source.id as string, target?.id as string | undefined);
          }}
        >
          <PlannerColumn
            id="todo"
            name="To Do" 
            counter={tasks.length} 
            color="sky" 
            showAddButton={true}
            handleAddTask={handleAddTask}
            handleMouseDown={focusTaskDraft}
          >
            {tasks.map((task) => (
              <TaskTemplateCard 
                key={task.id}
                id={task.id}
                title={task.title}
                duration={task.duration}
                color="sky"
                onChange={handleChangeTask}
                onBlur={handleOnBlurTask}
                onSubmit={handleSubmitTask}
                refInput={(el) => {
                  inputRefs.current[task.id] = el;
                }}
              />
            ))}
          </PlannerColumn>

          {
            dayColumns.map((column) => (
              <PlannerColumn
                key={column.id}
                id={column.id}
                name={column.name}
                counter={plannedTasks.filter((task) => task.day === column.id).length}
                color={column.color}
                showAddButton={false}
              >
                {plannedTasks.filter((task) => task.day === column.id).map((task) => (
                  <TaskPlannedCard
                    key={task.id}
                    task={task}
                    title={(getAttributeTask(task.templateId, "title") as string) || ""}
                    duration={(getAttributeTask(task.templateId, "duration") as number) || 0}
                    color={column.color}
                    onChangeState={onChangeStatePlannedTask}
                  />
                ))}
              </PlannerColumn>
            ))
          }
        </DragDropProvider>
      </div>
    </div>
  )
}

export default App;
