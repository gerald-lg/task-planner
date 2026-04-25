
import { useEffect, useRef, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import { PlannerColumn, TaskPlannedCard, TaskTemplateCard, useToast } from '@planner/components';
import { dayColumns } from '@planner/config';
import { useMomentDay, usePlannedTask, useTemplateTask } from '@planner/hooks';
import type { Day, MomentDay } from '@planner/models';

import './App.css'
import { backgroundByMoment, momentDays } from '@planner/helpers/planner';

function App() {
  const momentDay = useMomentDay();
  const [previewMomentDay, setPreviewMomentDay] = useState<MomentDay | null>(null);
  const isDev = import.meta.env.DEV;

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
    handleDeleteTask,
    handleEditTask,
    getPlannedCount,
  } = useTemplateTask();

  const {
    plannedTasks,
    createPlannedTask,
    addTask: addPlannedTask,
    moveTask: movePlannedTask,
    changeTaskState: changePlannedTaskState,
    deleteTask: deletePlannedTask,
    editPlannedTask,
  } = usePlannedTask();

  const { show } = useToast();

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const activeMomentDay = previewMomentDay ?? momentDay;
  const appBackground = `linear-gradient(rgba(2, 6, 23, 0.28), rgba(2, 6, 23, 0.35)), ${backgroundByMoment[activeMomentDay]}`;
  const greeting = `Good ${activeMomentDay}`;

  const handleDragEnd = (taskId: string, targetId?: string) => {
    if (!targetId || !dayColumns.some((column) => column.id === targetId)) {
      return;
    }

    const plannedTask = plannedTasks.find((task) => task.id === taskId);

    if (plannedTask) {
      if (plannedTask.day !== targetId) {
        movePlannedTask(plannedTask.id, targetId as Day);
        show("Task moved successfully", "success", { duration: 2000 });
      }

      return;
    }

    const newTask = createPlannedTask(taskId, targetId as Day);
    addPlannedTask(newTask);
    show("Task added successfully", "success", { duration: 2000 });
  };
  
  useEffect(() => {
    if(pendingFocusID){
      inputRefs.current[pendingFocusID]?.focus();
      setPendingFocusID(null);
    }
  }, [pendingFocusID, setPendingFocusID])

  return (
    <div className="min-h-screen p-4 transition-all duration-700" style={{ backgroundImage: appBackground }}>
      {isDev && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
          <div className="text-left text-sm font-semibold text-white">
            Background preview
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${previewMomentDay === null ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
              onClick={() => setPreviewMomentDay(null)}
            >
              Real time
            </button>
            {momentDays.map((day) => (
              <button
                key={day}
                type="button"
                className={`rounded-full px-3 py-1 text-sm font-medium capitalize transition ${previewMomentDay === day ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
                onClick={() => setPreviewMomentDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-left">{greeting}</h1>
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
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="w-full lg:w-72 lg:shrink-0">
            <PlannerColumn
              id="todo"
              name="To Do"
              counter={tasks.length}
              color="sky"
              showAddButton={true}
              handleAddTask={handleAddTask}
              handleMouseDown={focusTaskDraft}
              className="w-full"
            >
              {tasks.map((task) => (
                <TaskTemplateCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  duration={task.duration}
                  data={task}
                  color="sky"
                  onChange={handleChangeTask}
                  onBlur={handleOnBlurTask}
                  onSubmit={handleSubmitTask}
                  refInput={(el) => {
                    inputRefs.current[task.id] = el;
                  }}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  associatedPlannedCount={getPlannedCount(task.id)}
                />
              ))}
            </PlannerColumn>
          </div>

          <div className="board-scroll w-full lg:flex-1 lg:overflow-x-auto lg:pb-2">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:min-w-max">
              {dayColumns.map((column) => (
                <PlannerColumn
                  key={column.id}
                  id={column.id}
                  name={column.name}
                  counter={plannedTasks.filter((task) => task.day === column.id).length}
                  color={column.color}
                  showAddButton={false}
                  className="w-full lg:w-72 lg:shrink-0"
                >
                  {plannedTasks
                    .filter((task) => task.day === column.id)
                    .map((task) => (
                      <TaskPlannedCard
                        key={task.id}
                        task={task}
                        title={(getAttributeTask(task.templateId, "title") as string) || ""}
                        duration={(getAttributeTask(task.templateId, "duration") as number) || 0}
                        color={column.color}
                        onChangeState={changePlannedTaskState}
                        onDelete={deletePlannedTask}
                        onEdit={editPlannedTask}
                      />
                    ))}
                </PlannerColumn>
              ))}
            </div>
          </div>
        </div>
      </DragDropProvider>
    </div>
  )
}

export default App;
