import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from './App'
import { title } from "process"
import { error } from "console"

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
  changeStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHendler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }
  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim());
      setTitle("");
    } else {
      setError("Title is required")
    }

  }
  const onAllCilckHandler = () => { props.changeFilter("all") }
  const onActiveCilckHandler = () => { props.changeFilter("active") }
  const onConpletedCilckHandler = () => { props.changeFilter("completed") }


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input placeholder="New task"
          value={title}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHendler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked)
            }
            const onRemoveHandler = () => props.removeTask(t.id)
            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}></input>
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? "active-filter":""} 
        onClick={onAllCilckHandler}>All</button>
        <button className={props.filter === 'active' ? "active-filter":""} 
        onClick={onActiveCilckHandler}>Active</button>
        <button className={props.filter === 'completed' ? "active-filter":""} 
        onClick={onConpletedCilckHandler}>Completed</button>
      </div>
    </div>
  )
}