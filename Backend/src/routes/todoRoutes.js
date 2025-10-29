import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes protected by JWT
router.post("/", verifyToken, createTodo);
router.get("/", verifyToken, getTodos);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);


export default router;
