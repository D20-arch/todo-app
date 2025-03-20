// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/todos");
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

 useEffect(() => {
   fetch("http://localhost:8080/api/todos")  // <-- Use /api/todos instead of /todos
     .then(response => response.json())
     .then(data => console.log("Todos:", data))
     .catch(error => console.error("Error fetching todos:", error));
 }, []);


  return (
<div
  className="min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/todob.jpg')",
    backgroundSize: "cover",
    backgroundAttachment: "scroll", // Keeps it fixed while scrolling
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw", // Ensures it covers the full width
  }}
>
      <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
      <TodoForm fetchTodos={fetchTodos} />
      <TodoList todos={todos} fetchTodos={fetchTodos} />
    </div>
  );
};

export default App;
