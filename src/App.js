import {React, useEffect} from 'react'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

import { useState } from "react"

const App = () => {
  const [showAddTasks, setShowAddTasks] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data
  }

  //Fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data
  }

  //Toggles Show Add Task
  const onAddTasks = () => {setShowAddTasks(!showAddTasks)}

  //Increment the like count state
  const onLiked = () => {
    var newLikeCount = likeCount;
    newLikeCount= newLikeCount + 1;
    setLikeCount(newLikeCount);
  }

  //Adds a task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks/', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks, data]);

    // My first attempt solution: I used sequential ID
    // let newTasks = [...tasks];
    // const id = newTasks.length + 1;
    // task = {id, ...task}
    // newTasks.push(task);
    // task.id = newTasks.length;
    // setTasks(newTasks);

    // // Traversy's better solution
    // const id = Math.floor(Math.random() * 100000) + 1
    // const newTask = { id, ...task }
    // console.log(newTask)
    // setTasks([...tasks, newTask]);
  }

  //Deletes a task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'});

    setTasks(tasks.filter((task) => task.id !== id));
  } 

  //Toggles the reminder checkbox
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json();

    setTasks(tasks.map((task) => 
      task.id === id ? 
        {...task, reminder: data.reminder} : 
        task
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
