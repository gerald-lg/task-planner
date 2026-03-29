import { useEffect, useReducer, useRef, useState, type SubmitEvent } from 'react';

import { ListTask, TaskCard } from './planner/components';
import type { TaskTemplate } from './planner/models';
import { templateTaskReducer } from './planner/reducers';

import './App.css'

const initialTasks: TaskTemplate[] = [
  { id: '1', title: 'Task 1', duration: 30, isDraft: false },
  { id: '2', title: 'Task 2', duration: 45, isDraft: false },
  { id: '3', title: 'Task 3', duration: 60, isDraft: false },
  { id: '4', title: 'Task 4', duration: 15, isDraft: false },
];

function App() {

  const [tasks, dispatch] = useReducer(templateTaskReducer, initialTasks);
  
  const [pendingFocusID, setPendingFocusID] = useState<string|null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement| null>>({});

  const handleAddTask = () => {
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD_TASK_DRAFT', payload: { id } });
    setPendingFocusID(id);
  }

  const focusTaskDraft = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const draftTask = tasks.find((task) => task.isDraft);
    if(draftTask){
      setPendingFocusID(draftTask.id);
    }
  }

  const handleChangeTask = (value: string, id: string) => {
    dispatch({ type: 'CHANGE_TASK_TITLE', payload: { id, title: value } }); 
  }

  const handleOnBlurTask = (value: string, id: string) => {
    if(value.trim() === ""){
      dispatch({ type: 'DISCARD_TASK', payload: { id } });
    }
    else{
      dispatch({ type: 'SAVE_TASK', payload: { id } });
    }
  }

  const handleSubmitTask = (e:SubmitEvent<HTMLFormElement>, id:string) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_TASK', payload: { id } });
  }

  useEffect(() => {
    if(pendingFocusID){
      inputRefs.current[pendingFocusID]?.focus();
      setPendingFocusID(null);
    }
  }, [pendingFocusID])
  

  return (
    <>
      <ListTask 
        name="To Do" 
        counter={tasks.length} 
        color="sky" 
        handleAddTask={handleAddTask}
        handleMouseDown={focusTaskDraft}
      >
        {tasks.map((task) => (
          <TaskCard  
            key={task.id} 
            id={task.id} 
            title={task.title} 
            duration={task.duration} 
            onChange={handleChangeTask} 
            onSubmit={handleSubmitTask} 
            onBlur={handleOnBlurTask}
            ref={(el) => { inputRefs.current[task.id] = el }}
          />
        ))}
      </ListTask>
    </>
  )
}

export default App;
