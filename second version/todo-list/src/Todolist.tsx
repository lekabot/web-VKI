import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemFrom'
import { EditableSpan } from "./EditableSpan"
import { title } from "process"
import { error } from "console"

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  removeTask: (id: string, todoListsId: string) => void
  changeFilter: (value: FilterValuesType, todoListsId: string) => void
  addTask: (newTaskTitle: string, todoListsId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todoListsId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todoListsId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
  const onAllCilckHandler = () => { props.changeFilter("all", props.id) }
  const onActiveCilckHandler = () => { props.changeFilter("active", props.id) }
  const onConpletedCilckHandler = () => { props.changeFilter("completed", props.id) }
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} /><button onClick={removeTodolist}>x</button></h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {
          props.tasks.map(t => {
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.id)
            }
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(t.id, newValue, props.id)
            }
            const onRemoveHandler = () => props.removeTask(t.id, props.id)
            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox"
                onChange={onChangeStatusHandler}
                checked={t.isDone}></input>
              <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? "active-filter" : ""}
          onClick={onAllCilckHandler}>All</button>
        <button className={props.filter === 'active' ? "active-filter" : ""}
          onClick={onActiveCilckHandler}>Active</button>
        <button className={props.filter === 'completed' ? "active-filter" : ""}
          onClick={onConpletedCilckHandler}>Completed</button>
      </div>
    </div>
  )
}
