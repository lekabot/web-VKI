import React, { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemFrom';

export type FilterValuesType = "all" | "completed" | "active"
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string] : Array<TasksType>
}

function App() {
  let [filter, setFilter] = useState<FilterValuesType>("all")

  function changeStatus(taskId: string, isDone: boolean, todoListsId: string) {
    let tasks = tasksObj[todoListsId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }

  }

  function removeTask(id: string, todoListsId: string) {
    let tasks = tasksObj[todoListsId]
    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todoListsId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todoListsId: string) {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todoListsId]
    let newTasks = [task, ...tasks]
    tasksObj[todoListsId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeFilter(value: FilterValuesType, todoListsId: string) {
    let todolist = todolists.find(tl => tl.id === todoListsId)
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists])
    }
  }

  let removeTodolist = (todoListsId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todoListsId)
    setTodolist(filteredTodolist)
    delete tasksObj[todoListsId]
    setTasks({ ...tasksObj })
  }

  let todoListsId1 = v1()
  let todoListsId2 = v1()

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: todoListsId1, title: "What to learn", filter: "all" },
    { id: todoListsId2, title: "What to buy", filter: "all" }
  ])

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListsId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Python", isDone: false },
      { id: v1(), title: "Django", isDone: true },
      { id: v1(), title: "Flask", isDone: false },
      { id: v1(), title: "Docker", isDone: true }],
    [todoListsId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: true },
      { id: v1(), title: "Tomatos", isDone: false },
      { id: v1(), title: "Eggs", isDone: false },
      { id: v1(), title: "Pasta", isDone: false },
      { id: v1(), title: "Pizza", isDone: true },
      { id: v1(), title: "Sausages", isDone: false },
      { id: v1(), title: "Water", isDone: true }],
  });

  function addTodolist(title: string){
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    };
    setTodolist([todolist, ...todolists])
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {
        todolists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id]
          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }
          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }
          return <Todolist title={tl.title}
            key={tl.id}
            id={tl.id}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        })
      }

    </div>
  );
}

export default App;
