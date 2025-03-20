import React, { useState } from "react";
import axios from "axios";

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(todo.description);
  const [updatedDueDate, setUpdatedDueDate] = useState(todo.dueDate);
  const [updatedPriority, setUpdatedPriority] = useState(todo.priority);
  const [updatedCategory, setUpdatedCategory] = useState(todo.category);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
        title: updatedTitle,
        description: updatedDescription,
        completed: todo.completed,
        dueDate: updatedDueDate,
        priority: updatedPriority,
        category: updatedCategory,
      });

      setIsEditing(false); // Exit edit mode
      fetchTodos(); // Refresh list
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2">
      {isEditing ? (
        <div>
          {/* Editable fields */}
          <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
          <textarea value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)}></textarea>
          <input type="date" value={updatedDueDate} onChange={(e) => setUpdatedDueDate(e.target.value)} />
          <select value={updatedPriority} onChange={(e) => setUpdatedPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Fitness">Fitness</option>
          </select>

          <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
        </div>
      ) : (
        <div>
          <h3 className={`text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}>
            {todo.title}
          </h3>
          <p>{todo.description}</p>
          <p><strong>Category:</strong> {todo.category}</p>
          <p><strong>Priority:</strong> {todo.priority}</p>
          <p><strong>Due Date:</strong> {todo.dueDate}</p>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-3 py-1 rounded">
          Edit
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
