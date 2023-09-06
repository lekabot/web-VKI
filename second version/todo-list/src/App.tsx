import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

function App() {
  let [tasks, setTasks] = useState([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
  ])
  let [filter, setFilter] = useState("all")

  function removeTask(id: number) {
    let filteredTasks = tasks.filter(t => t.id != id)
    setTasks(filteredTasks)
  }

  let tasksForTodolist = tasks
  if (filter == "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone == true)
  }
  if (filter == "active") {
    tasksForTodolist = tasks.filter(t => t.isDone == false)
  }

  return (
    <div className="App">
      <Todolist title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        />
    </div>
  );
}

export default App;
