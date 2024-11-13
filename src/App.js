import { BrowserRouter as Router, Route } from "react-router-dom";
import { React, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import Footer from "./components/Footer";

import { useState } from "react";

const apiEndpoint =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:8000";

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
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch(apiEndpoint + "/tasks");
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(apiEndpoint + `/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const fetchLikes = async () => {
    const res = await fetch(apiEndpoint + "/likes");
    const data = await res.json();

    return data;
  };

  const onAddTasks = () => {
    setShowAddTasks(!showAddTasks);
  };

  const addTask = async (task) => {
    const res = await fetch(apiEndpoint + "/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    await fetch(apiEndpoint + `/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(apiEndpoint + `/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const onLiked = async () => {
    const likesCount = await fetchLikes();
    var updatedCount = { ...likesCount.count, count: likesCount.count + 1 };

    const res = await fetch(apiEndpoint + "/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCount),
    });
    const data = await res.json();

    setLikeCount(data.count);
  };

  return (
    <Router>
      <div className="container">
        <Header
          showAddTasks={showAddTasks ? 1 : 0}
          onShowAddTasks={onAddTasks}
          likeCount={likeCount}
          onLike={onLiked}
        />
        {showAddTasks && <AddTask onAdd={addTask} />}
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                <p style={{ color: "red" }}>No tasks available!</p>
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
