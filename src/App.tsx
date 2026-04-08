
import { useEffect, useRef } from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import { PlannerColumn, TaskCard } from './planner/components';
import type { ColorType, Day } from './planner/models';
import { usePlannedTask, useTemplateTask } from './planner/hooks';

import './App.css'
import { getMomentDay } from './planner/helpers/planner';

const dayColumns = [
  {
    id: "monday" as Day,
    name: "Monday",
    color: "green" as ColorType,
  },
  {
    id: "tuesday" as Day,
    name: "Tuesday",
    color: "blue" as ColorType,
  },
  {
    id: "wednesday" as Day,
    name: "Wednesday",
    color: "red" as ColorType,
  },
  {
    id: "thursday" as Day,
    name: "Thursday",
    color: "yellow" as ColorType,
  },
  {
    id: "friday" as Day,
    name: "Friday",
    color: "green" as ColorType,
  },
  {
    id: "saturday" as Day,
    name: "Saturday",
    color: "sky" as ColorType,
  },
  {
    id: "sunday" as Day,
    name: "Sunday",
    color: "yellow" as ColorType,
  },
]

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
              <TaskCard.Root color="sky" key={task.id} id={task.id}>
                <div className="text-white">
                  <TaskCard.InputTitle
                    title={task.title}
                    onChange={handleChangeTask}
                    onSubmit={handleSubmitTask}
                    onBlur={handleOnBlurTask}
                    refInput={(el) => {
                      inputRefs.current[task.id] = el;
                    }}
                  />
                  <section className="flex flex-row items-center justify-end gap-2">
                    <TaskCard.Duration duration={task.duration} />
                  </section>
                </div>
              </TaskCard.Root>
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
                  <TaskCard.Root color={column.color} key={task.id} id={task.id}>
                    <div className="text-white">
                      <TaskCard.Title
                        title={(getAttributeTask(task.templateId, "title") as string) || ""}
                      />
                      <TaskCard.Note note={task.note || ""} />
                      <section className="flex flex-row items-center justify-end gap-2">
                        <TaskCard.State state={task.state} onChangeState={onChangeStatePlannedTask} />
                        <TaskCard.Duration duration={(getAttributeTask(task.templateId, "duration") as number) || 0} />
                      </section>
                    </div>
                  </TaskCard.Root>
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
