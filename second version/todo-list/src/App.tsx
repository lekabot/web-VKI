import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {TasksType} from './Todolist'

let tasks1: Array<TasksType> = [
  { id: 1, title: "CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "React", isDone: false },
]

let tasks2: Array<TasksType> = [
  { id: 1, title: "Big bang theory", isDone: true },
  { id: 2, title: "How i face your mam", isDone: false },
  { id: 3, title: "Big Maik", isDone: true },
]

let tasks3: Array<TasksType> = [
  { id: 1, title: "Painkiller", isDone: false },
  { id: 2, title: "My Demons", isDone: true },
  { id: 3, title: "Leave It All Begind", isDone: true },
]

function App() {
  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks1} />
      <Todolist title="Movies" tasks={tasks2}/>
      <Todolist title="Songs" tasks={tasks3} />
    </div>
  );
}

export default App;
