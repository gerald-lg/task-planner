
import { useEffect, useRef, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import { PlannerColumn, TaskCard } from './planner/components';
import type { ColorType, Day, PlannedTask, TaskTemplate } from './planner/models';
import { useTemplateTask } from './planner/hooks';

import './App.css'
import { getMomentDay } from './planner/helpers/planner';
import { getNewState } from './planner/helpers';

const initialTasks: TaskTemplate[] = [
  { id: '1', title: 'Task 1', duration: 30, isDraft: false },
  { id: '2', title: 'Task 2', duration: 45, isDraft: false },
  { id: '3', title: 'Task 3', duration: 60, isDraft: false },
  { id: '4', title: 'Task 4', duration: 15, isDraft: false },
];

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
    getTaskById
  } = useTemplateTask(initialTasks);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const greeting = `Good ${getMomentDay()}`;

  const [plannedTasks, setPlannedTasks] = useState<PlannedTask[]>([]);

  const handleDragEnd = (taskId: string, plannerColumnId: string) => {
    if(plannerColumnId !== "todo"){
      const existTask = plannedTasks.some((task) => task.id === taskId);
      if(existTask){
        const task = plannedTasks.find((task) => task.id === taskId) as PlannedTask;
        if(task.day !== plannerColumnId){
          onMoveTask(task, plannerColumnId as Day);
        }
      }else{
        const newTask = createPlannedTask(taskId, plannerColumnId as Day);
        addPlannedTask(newTask);
      }
    }
  }

  const onMoveTask = (plannedTask: PlannedTask, new_day : Day) => {
    setPlannedTasks((prev) => 
      prev.map((task) => {
        if(task.id === plannedTask.id){
          return {
            ...plannedTask,
            day: new_day
          }
        }
        return task;
      })
    )
  }

  const addPlannedTask = (task: PlannedTask) => {
    setPlannedTasks((prev) => [...prev, task]);
  }

  const createPlannedTask = (templateId: string, day: Day): PlannedTask => {
    return {
      id: crypto.randomUUID(),
      templateId,
      day: day,
      order: 0,
      state: "todo",
    }
  }

  const getTitleTask = (templateId: string) => {
    const task = getTaskById(templateId);
    return task ? task.title : "";
  }

  const changeStatePlannedTask = (taskId: string) => {
    setPlannedTasks((prev) => (
      prev.map((task) => {
        if(task.id === taskId){
          return {
            ...task,
            state: getNewState(task.state),
          }
        }
        return task;
      })
    ))
  }

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
            handleDragEnd(source!.id as string, target!.id as string);
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
              <TaskCard
                color="sky"
                key={task.id} 
                id={task.id} 
                title={task.title} 
                duration={task.duration} 
                onChange={handleChangeTask} 
                onSubmit={handleSubmitTask} 
                onBlur={handleOnBlurTask}
                refInput={(el) => { inputRefs.current[task.id] = el }}
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
                  <TaskCard
                    color={column.color}
                    key={task.id}
                    id={task.id}
                    title={getTitleTask(task.templateId)}
                    state={task.state}
                    duration={getTaskById(task.templateId)?.duration || 0}
                    note={task.note || ''}
                    onChange={handleChangeTask}
                    onSubmit={handleSubmitTask}
                    onBlur={handleOnBlurTask}
                    onChangeState={changeStatePlannedTask}
                    refInput={(el) => { inputRefs.current[task.id] = el }}
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
