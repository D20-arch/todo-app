import React, {useState} from "react"
import axios from "axios"
const TodoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Connect to your Spring Boot backend API
      await axios.post("http://localhost:8080/api/todos", {
        title,
        description,
        completed: false,
      });
      setTitle("");
      setDescription("");
      fetchTodos(); // Refresh the list after adding a new to-do
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}