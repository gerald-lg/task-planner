
import { useEffect, useRef, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import { PlannerColumn, TaskCard } from './planner/components';
import type { PlannedTask, TaskTemplate } from './planner/models';
import { useTemplateTask } from './planner/hooks';

import './App.css'

const initialTasks: TaskTemplate[] = [
  { id: '1', title: 'Task 1', duration: 30, isDraft: false },
  { id: '2', title: 'Task 2', duration: 45, isDraft: false },
  { id: '3', title: 'Task 3', duration: 60, isDraft: false },
  { id: '4', title: 'Task 4', duration: 15, isDraft: false },
];

const mondayTasksArray: PlannedTask[] = [];

function App() {

  const { 
    tasks, 
    pendingFocusID,
    handleAddTask,
    focusTaskDraft,
    handleChangeTask,
    handleOnBlurTask,
    handleSubmitTask,
    setPendingFocusID 
  } = useTemplateTask(initialTasks);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [mondayTasks, setMondayTasks] = useState<PlannedTask[]>(mondayTasksArray);

  const handleDragEnd = (taskId: string, plannerColumnId: string) => {
    if(plannerColumnId === "monday"){
      const newTask = createPlannedTask(taskId, plannerColumnId);
      addMondayTasks(newTask);
    }
  }

  const addMondayTasks = (task: PlannedTask) => {
    setMondayTasks((prev) => [...prev, task]);
  }

  const createPlannedTask = (templateId: string, day: string): PlannedTask => {
    return {
      id: crypto.randomUUID(),
      templateId,
      day: day as PlannedTask['day'],
      order: 0,
      state: "todo",
    }
  }

  const getTitleTask = (templateId: string) => {
    const task = tasks.find((t) => t.id === templateId);
    return task ? task.title : "";
  }

  useEffect(() => {
    if(pendingFocusID){
      inputRefs.current[pendingFocusID]?.focus();
      setPendingFocusID(null);
    }
  }, [pendingFocusID])

  return (
    <div className="flex flex-row gap-4 p-4">
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

        <PlannerColumn
          id="monday"
          name="Monday" 
          counter={mondayTasks.length} 
          color="green" 
          showAddButton={false}
        >
          {mondayTasks.map((task) => (
            <TaskCard
              color="green"
              key={task.id} 
              id={task.id} 
              title={getTitleTask(task.templateId)} 
              duration={0}
              onChange={handleChangeTask} 
              onSubmit={handleSubmitTask} 
              onBlur={handleOnBlurTask}
              refInput={(el) => { inputRefs.current[task.id] = el }}
            />
          ))}
        </PlannerColumn>
      </DragDropProvider>
    </div>
  )
}

export default App;
