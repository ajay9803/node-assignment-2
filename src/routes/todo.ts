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
router.post("/create-todo", createTodo);
router.delete("/delete-todo/:id", deleteTodoById);
router.patch("/update-todo/:id", updateTodo);

export default router;
