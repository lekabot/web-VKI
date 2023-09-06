import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from './App'

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (newTaskTitle: string) => void
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode == 13) {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }
  const addTask = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle("")
  }
  const onAllCilckHandler = () => { props.changeFilter("all") }
  const onActiveCilckHandler = () => { props.changeFilter("active") }
  const onConpletedCilckHandler = () => { props.changeFilter("completed") }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input placeholder="New task"
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHendler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const onRemoveHandler = () => props.removeTask(t.id)
            return <li key={t.id}>
              <input type="checkbox" checked={t.isDone}></input>
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div>
        <button onClick={onAllCilckHandler}>All</button>
        <button onClick={onActiveCilckHandler}>Active</button>
        <button onClick={onConpletedCilckHandler}>Completed</button>
      </div>
    </div>
  )
}