import React, { useState } from "react";
import {  FaStar, FaCalendarAlt } from "react-icons/fa";
import "./TaskInput.css";

const TaskInput = ({ addTask }) => {
  const [text, setText] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isPlanned, setIsPlanned] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, isImportant, isPlanned, assignedTo);
      setText("");
      setIsImportant(false);
      setIsPlanned(false);
      setAssignedTo("");
    }
  };

  return (
    <div className="task-input-container">
      <form className="task-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label>
          <input type="checkbox" checked={isImportant} onChange={() => setIsImportant(!isImportant)} />
        <FaStar /> Important
        </label>
        
        <label>
          <input type="checkbox" checked={isPlanned} onChange={() => setIsPlanned(!isPlanned)} />
          <FaCalendarAlt/>  Planned
        </label>
        <input
          type="text"
          placeholder="Assign to (optional)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TaskInput;
