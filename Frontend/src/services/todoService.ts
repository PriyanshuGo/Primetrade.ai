import axiosInstance from "@/services/axoisInstance";
import type { Todo } from "@/types/todo";

// GET all todos
export const getTodos = async (): Promise<Todo[]> => {
  const res = await axiosInstance.get("/todo/");
  return res.data.data.todos; // based on your successResponse structure
};

// CREATE new todo
export const createTodo = async (todo: { title: string; description: string }) => {
  const res = await axiosInstance.post("/todo/", todo);
  return res.data.data.todo;
};

// UPDATE a todo
export const updateTodo = async (id: string, todo: { title: string; description: string }) => {
  const res = await axiosInstance.put(`/todo/${id}`, todo);
  return res.data.data.todo;
};

// DELETE a todo
export const deleteTodo = async (id: string) => {
  const res = await axiosInstance.delete(`/todo/${id}`);
  return res.data;
};
