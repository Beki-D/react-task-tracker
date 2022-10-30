import React from 'react'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

import { useState } from "react"

const App = () => {
  // const name = "Beki"

  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: "Go see the doctor",
        day: 'February 5th at 2:30pm',
        reminder: true
    },
    {
        id: 2,
        text: "Real Business Meeting",
        day: 'February 15th at 12:30pm',
        reminder: true
    },
    {
        id: 3,
        text: "Go to the gym",
        day: 'February 5th at 2:00pm',
        reminder: false
    }
]
)
//Add task
const addTask = (task) => {
  console.log(task)
}

//Deletes task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
  //console.log('Delete', id)
} 

//Toggle Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task
    )
  )
  //console.log(id)
}

  return (
    <div className="container">
      <Header/>
      <AddTask onAdd={addTask}/>
      {tasks.length>0 ? (
        <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>
        ) : (
          <p style={{color: 'red'}}>No tasks available!</p>
        )}
     </div>
  );
}

export default App;
