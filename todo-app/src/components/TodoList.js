// src/components/TodoList.js
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, fetchTodos }) => {
  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available. Add a new task!</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />)
      )}
    </div>
  );
};

export default TodoList;
