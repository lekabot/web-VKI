import React, { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from './Todolist';

export type FilterValuesType = "all" | "completed" | "active"

function App() {
  let [tasks, setTasks] = useState<Array<TasksType>>([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "Redux", isDone: false },
    { id: 4, title: "React", isDone: false },
    { id: 5, title: "Python", isDone: false },
    { id: 6, title: "Django", isDone: true },
    { id: 7, title: "Flask", isDone: false },
    { id: 8, title: "Docker", isDone: true },
  ])
  let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(id: number) {
    let filteredTasks = tasks.filter(t => t.id != id)
    setTasks(filteredTasks)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
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
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
