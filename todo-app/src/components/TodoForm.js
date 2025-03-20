import React, { useState } from "react";
import axios from "axios";
import { FaPlus, FaTimes, FaBriefcase, FaUser, FaBook, FaDumbbell, FaFlag } from "react-icons/fa";
import "./TodoForm.css"

const TodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title cannot be empty.");
      setSuccess("");
      return;
    }
    if (!dueDate) {
      setError("Please select a due date.");
      setSuccess("");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/todos", {
        title,
        description,
        completed: false,
        dueDate,
        priority,
        category,
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setCategory("Work");
      setError("");
      setSuccess("Task added successfully! ✅");
      fetchTodos();

      setTimeout(() => setSuccess(""), 3000);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add task. Please try again.");
      setSuccess("");
    }
  };

  return (
    <>
      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}   className="custom-add-button">
        <FaPlus size={20} /> Add new task
      </button>

      {/* Modal Popup with Animation */}
      {isModalOpen && (
        <div className="todo-form-container ">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transform animate-slideUp">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Add a New Task</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>

            {/* Form */}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Task title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              ></textarea>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              />

              {/* Category Dropdown with Icons */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Work">📁 Work</option>
                  <option value="Personal">👤 Personal</option>
                  <option value="Study">📚 Study</option>
                  <option value="Fitness">🏋️ Fitness</option>
                </select>
              </div>

              {/* Priority Dropdown with Icons */}
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🔴 High</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoForm;
