import axios from 'axios';

const API_BASE_URL = "http://localhost:8080"; // Your Spring Boot backend URL

export const getTodos = async () => {
  const response = await axios.get(`${API_BASE_URL}/todos`);
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await axios.post(`${API_BASE_URL}/todos`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_BASE_URL}/todos/${id}`);
};
