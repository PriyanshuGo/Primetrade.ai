import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";

/**
 * @desc Create a new todo for the logged-in user
 */
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // 1️⃣ Basic validation
    if (!title || !description) {
      return errorResponse(res, "Title and description are required", 400);
    }

    // 2️⃣ Create new todo
    const newTodo = new Todo({
      title,
      description,
      userId: req.user._id,
    });

    await newTodo.save();

    // 3️⃣ Return success
    return successResponse(res, { todo: newTodo }, "Todo created successfully", 201);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to create todo", 500, error.message);
  }
};

/**
 * @desc Get all todos for logged-in user
 */
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return successResponse(res, { todos }, "Todos fetched successfully", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to fetch todos", 500, error.message);
  }
};

/**
 * @desc Update a specific todo by ID
 */
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // 1️⃣ Validate
    if (!title || !description) {
      return errorResponse(res, "Title and description are required", 400);
    }

    // 2️⃣ Update
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, description },
      { new: true }
    );

    if (!updatedTodo) {
      return errorResponse(res, "Todo not found or unauthorized", 404);
    }

    return successResponse(res, { todo: updatedTodo }, "Todo updated successfully", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to update todo", 500, error.message);
  }
};

/**
 * @desc Delete a todo by ID
 */
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!deletedTodo) {
      return errorResponse(res, "Todo not found or unauthorized", 404);
    }

    return successResponse(res, {}, "Todo deleted successfully", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to delete todo", 500, error.message);
  }
};

export { createTodo, getTodos, updateTodo, deleteTodo };
