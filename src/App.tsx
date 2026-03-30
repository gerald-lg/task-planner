
import { useEffect, useRef } from 'react';

import { PlannerColumn, TaskCard } from './planner/components';
import type { TaskTemplate } from './planner/models';
import { useTemplateTask } from './planner/hooks';

import './App.css'

const initialTasks: TaskTemplate[] = [
  { id: '1', title: 'Task 1', duration: 30, isDraft: false },
  { id: '2', title: 'Task 2', duration: 45, isDraft: false },
  { id: '3', title: 'Task 3', duration: 60, isDraft: false },
  { id: '4', title: 'Task 4', duration: 15, isDraft: false },
];

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

  useEffect(() => {
    if(pendingFocusID){
      inputRefs.current[pendingFocusID]?.focus();
      setPendingFocusID(null);
    }
  }, [pendingFocusID])

  return (
    <>
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
    </>
  )
}

export default App;
