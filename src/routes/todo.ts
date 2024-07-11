import express from "express";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controllers/todo";

// todo - router
const router = express();

// router methods on todos
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.delete("/:id", deleteTodoById);
router.put("/:id", updateTodo);

export default router;
