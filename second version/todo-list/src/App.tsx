import React, { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "completed" | "active"
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
function App() {
  let [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Python", isDone: false },
    { id: v1(), title: "Django", isDone: true },
    { id: v1(), title: "Flask", isDone: false },
    { id: v1(), title: "Docker", isDone: true },
  ])
  let [filter, setFilter] = useState<FilterValuesType>("all")

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  let todoLists: Array<TodolistType> = [
    { id: v1(), title: "What to learn", filter: "active" },
    { id: v1(), title: "What to buy", filter: "completed" }
  ]

  return (
    <div className="App">
      {
        todoLists.map((tl) => {
          let tasksForTodolist = tasks
          if (tl.filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone === true)
          }
          if (tl.filter === "active") {
            tasksForTodolist = tasks.filter(t => t.isDone === false)
          }
          return <Todolist title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
          />
        })
      }

    </div>
  );
}

export default App;
