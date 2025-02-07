import React from "react";
import { FaStar, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import "./TaskList.css";

const TaskList = ({ tasks, deleteTask, editTask, toggleTaskCompletion }) => {
  return (
    <div className="task-list-container">
      <ul className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <span onClick={() => toggleTaskCompletion(task.id)}>{task.text}</span>
              {task.isImportant && <span><FaStar/></span>}
              {task.isPlanned && <span><FaCalendarAlt/></span>}
              {task.assignedTo && <span>👤 {task.assignedTo}</span>}
              <div className="task-buttons">
                <button onClick={() => editTask(task.id, prompt("Edit task:", task.text))}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                <button className="complete-btn" onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? "Undo" : "Complete"} <FaCheckCircle />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
