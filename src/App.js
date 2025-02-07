import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  const getSavedTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const getSavedTheme = () => {
    return localStorage.getItem("theme") || "light";
  };

  const [tasks, setTasks] = useState(getSavedTasks);
  const [filter, setFilter] = useState("All Tasks");
  const [theme, setTheme] = useState(getSavedTheme);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addTask = (text, isImportant = false, isPlanned = false, assignedTo = "") => {
    const newTasks = [...tasks, { id: Date.now(), text, isImportant, isPlanned, assignedTo, completed: false }];
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (id, updatedText) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: updatedText } : task
    );
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Important") return task.isImportant;
    if (filter === "Planned") return task.isPlanned;
    if (filter === "Assigned to Me") return task.assignedTo !== "";
    return true;
  });

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar setFilter={setFilter} />
      <main className="main-content">
        <div className="header">
          <h1>{filter}</h1>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
        <TaskInput addTask={addTask} />
        <TaskList tasks={filteredTasks} deleteTask={deleteTask} editTask={editTask} toggleTaskCompletion={toggleTaskCompletion} />
      </main>
    </div>
  );
};

export default App;
