// src/components/TodoItem.js
import React from "react";
import axios from "axios";

const TodoItem = ({ todo, fetchTodos }) => {
  const handleToggleComplete = async () => {
    try {
      await axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      fetchTodos(); // Refresh the list
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${todo.id}`);
      fetchTodos(); // Refresh the list
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2">
      <div>
        <h3 className={`text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}>
          {todo.title}
        </h3>
        <p className="text-sm">{todo.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleToggleComplete}
          className={`px-3 py-1 rounded text-white ${todo.completed ? "bg-green-500" : "bg-blue-500"}`}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
