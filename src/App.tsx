import { useEffect, useRef, useState, type SubmitEvent } from 'react'
import './App.css'
import { ListTask } from './planner/components/ListTask'
import { TaskCard } from './planner/components/TaskCard'
import type { TaskTemplate } from './planner/models';

const initialTasks: TaskTemplate[] = [
  { id: '1', title: 'Task 1', duration: 30, isDraft: false },
  { id: '2', title: 'Task 2', duration: 45, isDraft: false },
  { id: '3', title: 'Task 3', duration: 60, isDraft: false },
  { id: '4', title: 'Task 4', duration: 15, isDraft: false },
];


function App() {

  const [tasks, setTasks] = useState<TaskTemplate[]>(initialTasks);
  
  const [pendingFocusID, setPendingFocusID] = useState<string|null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement| null>>({});

  const handleAddTask = () => {
    const id = crypto.randomUUID();
    setTasks((prev) => {
      const newTask: TaskTemplate = {
        id: id,
        title: ``,
        isDraft: true,
      }
      return [...prev, newTask];
    });

    setPendingFocusID(id);
  }

  const handleChangeTask = (value: string, id: string) => {
    setTasks((prev) => {
      const newTasks = prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: value,
          }
        }
        return task;

      })
      return newTasks;
    });
  }

  const handleOnBlurTask = (value: string, id: string) => {
    if(value.trim() === ""){
      setTasks((prev) => {
        const tasks = prev.filter((task) => task.id != id);

        return tasks;
      })
    }
    else{
      changeDraftState(id);
    }

  }

  const handleSubmitTask = (e:SubmitEvent<HTMLFormElement>, id:string) => {
    e.preventDefault();
    changeDraftState(id);
  }

  const changeDraftState = (id: string) => {

    setTasks((prev) => {
      const tasks = prev.map((task) => {
        if(task.id === id){
          return {
            ...task,
            isDraft: false,
          }
        }

        return task;
      });

      return tasks;
    })

  }

  useEffect(() => {
    if(pendingFocusID){
      inputRefs.current[pendingFocusID]?.focus();
      setPendingFocusID(null);
    }
  }, [pendingFocusID])
  

  return (
    <>
      <ListTask name="To Do" counter={tasks.length} color="sky" handleAddTask={handleAddTask}>
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
