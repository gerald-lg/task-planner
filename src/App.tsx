import './App.css'
import { ListTask } from './planner/components/ListTask'
import { TaskCard } from './planner/components/TaskCard'

function App() {

  return (
    <>
      <ListTask name="To Do" counter={3} color="sky" handleAddTask={() => console.log('Add Task')}>
        <TaskCard title="Task 1" duration={30}  />
        <TaskCard title="Task 1" duration={30} />
        <TaskCard title="Task 1" duration={30} />
        <TaskCard title="Task 1" duration={30} />
      </ListTask>
    </>
  )
}

export default App
