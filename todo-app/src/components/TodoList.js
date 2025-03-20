import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TodoList.css";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedData, setEditedData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo.id);
    setEditedData({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
    });
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/todos/${editingTodo}`, {
        ...editedData,
      });
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Function to toggle task completion status
  const toggleCompleted = async (todo) => {
    try {
      await axios.put(`http://localhost:8080/api/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500 text-white";
      case "MEDIUM":
        return "bg-yellow-500 text-black";
      case "LOW":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="todo-list-container p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Your To-Do List</h2>
      {sortedTodos.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Due Date</th>
              <th className="border border-gray-300 p-2">Priority</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTodos.map((todo) => (
              <tr key={todo.id} className="text-center border border-gray-300">
                {editingTodo === todo.id ? (
                  <>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="title"
                        value={editedData.title}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <textarea
                        name="description"
                        value={editedData.description}
                        onChange={handleEditChange}
                        className="border p-1 rounded w-full"
                      ></textarea>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="date"
                        name="dueDate"
                        value={editedData.dueDate}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <select
                        name="priority"
                        value={editedData.priority}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      >
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button onClick={handleUpdate} className="bg-green-500 text-black px-3 py-1 rounded">
                        ✅ Save
                      </button>
                      <button onClick={() => setEditingTodo(null)} className="bg-gray-500 text-black px-3 py-1 rounded ml-2">
                        ❌ Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 p-2">{todo.title}</td>
                    <td className="border border-gray-300 p-2">{todo.description}</td>
                    <td className="border border-gray-300 p-2">{todo.dueDate}</td>
                    <td className={`border border-gray-300 p-2 ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => toggleCompleted(todo)}
                        className={todo.completed ? "bg-green-500 text-black px-3 py-1 rounded" : "bg-yellow-500 text-black px-3 py-1 rounded"}
                      >
                        {todo.completed ? "✅ Completed" : "⏳ Mark as Completed"}
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleEditClick(todo)}
                        className="bg-blue-500 text-black px-3 py-1 rounded mr-2"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="bg-red-500 text-black px-3 py-1 rounded"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No tasks found. Add a new task above! 😊</p>
      )}
    </div>
  );
};

export default ToDoList;
