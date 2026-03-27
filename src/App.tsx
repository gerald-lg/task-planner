import { useState } from 'react'
import './App.css'
import { ListTask } from './planner/components/ListTask'
import { TaskCard } from './planner/components/TaskCard'
import type { TaskTemplate } from './planner/models';

const initialTasks: TaskTemplate[] = [
  { id: '1', title: 'Task 1', duration: 30 },
  { id: '2', title: 'Task 2', duration: 45 },
  { id: '3', title: 'Task 3', duration: 60 },
  { id: '4', title: 'Task 4', duration: 15 },
];


function App() {

  const [tasks, setTasks] = useState<TaskTemplate[]>(initialTasks);

  const handleAddTask = () => {
    setTasks(() => {
      const newTask: TaskTemplate = {
        id: (tasks.length + 1).toString(),
        title: ``,
      }

      return [...tasks, newTask]
    });
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

  return (
    <>
      <ListTask name="To Do" counter={tasks.length} color="sky" handleAddTask={handleAddTask}>
        {tasks.map((task) => (
          <TaskCard  key={task.id} id={task.id} title={task.title} duration={task.duration} onChange={handleChangeTask} onSubmit={() => {}} />
        ))}
      </ListTask>
    </>
  )
}

export default App
