import { BrowserRouter as Router, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {React, useEffect} from 'react';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from './components/About';
import Footer from './components/Footer';

import { useState } from "react"

const port = '5000'
const apiEndpoint = "http://localhost:" + port;

const App = () => {
  const [showAddTasks, setShowAddTasks] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      const likesCountFromServer = await fetchLikes();
      setTasks(tasksFromServer);
      setLikeCount(likesCountFromServer.count);
    }
    getTasks();
  }, [])

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(apiEndpoint + "/tasks");
    const data = await res.json();

    return data
  }

  //Fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(apiEndpoint + `/tasks/${id}`);
    const data = await res.json();
    
    return data
  }
  
  //Fetch likes count
  const fetchLikes = async () => {
    const res = await fetch(apiEndpoint + "/likes");
    const data = await res.json();

    return data
  }
  
  //Toggles Show Add Task
  const onAddTasks = () => {setShowAddTasks(!showAddTasks)}
  
  //Adds a task
  const addTask = async (task) => {
    const res = await fetch(apiEndpoint + '/tasks/', {
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
    await fetch(apiEndpoint + `/tasks/${id}`, {method: 'DELETE'});
    
    setTasks(tasks.filter((task) => task.id !== id));
  } 
  
  //Toggles the reminder checkbox
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder }
    
    const res = await fetch(apiEndpoint + `/tasks/${id}`, {
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
  
  //Increment the like count state
  const onLiked = async () => {
    const likesCount = await fetchLikes();
    console.log(likesCount)
    var updatedCount = {...likesCount.count, count: likesCount.count + 1};
    
    //updating the JSON item wz PUT request
    const res = await fetch(apiEndpoint + '/likes', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCount)
    })
    const data = await res.json();

    setLikeCount(data.count);
  }

  return (
    <Router>
      <div className="container">
        <Header showAddTasks={showAddTasks ? 1 : 0} onShowAddTasks={onAddTasks} likeCount={likeCount} onLike={onLiked} />
        {showAddTasks && <AddTask onAdd={addTask}/>}
        <Route path="/" exact render={(props) => (
          <>
            {(tasks.length > 0) ? 
              (<Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>) : 
              (<p style={{color: 'red'}}>No tasks available!</p>)}
          </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
     </Router>
  );
}

export default App;
