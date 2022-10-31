import React from 'react'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

import { useState } from "react"

const App = () => {
  const [showAddTasks, setShowAddTasks] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
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

  const onAddTasks = () => {setShowAddTasks(!showAddTasks)}

  const onLiked = () => {
    var newLikeCount = likeCount;
    newLikeCount= newLikeCount + 1;
    setLikeCount(newLikeCount);
  }


  const addTask = (task) => {
    // My first attempt solution: I used sequential ID

    // let newTasks = [...tasks];
    // const id = newTasks.length + 1;
    // task = {id, ...task}
    // newTasks.push(task);
    // task.id = newTasks.length;
    // setTasks(newTasks);

    // Traversy's better solution

    const id = Math.floor(Math.random() * 100000) + 1
    const newTask = { id, ...task }
    console.log(newTask)
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    //console.log('Delete', id)
  } 

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task
      )
    )
  }

  return (
    <div className="container">
      <Header showAddTasks={showAddTasks ? 1 : 0} onShowAddTasks={onAddTasks} likeCount={likeCount} onLike={onLiked} />
      {showAddTasks && <AddTask onAdd={addTask}/>}
      {(tasks.length > 0) ? 
        (<Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>) : 
        (<p style={{color: 'red'}}>No tasks available!</p>)
      }
     </div>
  );
}

export default App;
