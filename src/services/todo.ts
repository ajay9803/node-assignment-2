import * as TodoModel from "../models/todo";
import { Todo } from "../interfaces/todo";

// create todo - return success / failure result
export const createTodo = (todo: Todo) => {
  const todosWithId = TodoModel.todos.some((theTodo) => todo.id === theTodo.id);
  if (todosWithId) {
    return {
      statusCode: 409,
      message: `Todo with id: ${todo.id} already exists`,
    };
  }
  TodoModel.createTodo(todo);
  return {
    statusCode: 201,
    message: "Todo created successfully.",
  };
};

// delete todo - return success result
export const deleteTodo = (todoId: string) => {
  TodoModel.deleteTodo(todoId);
  return {
    statusCode: 204,
    message: "Todo deleted successfully.",
  };
};

// fetch all todos - return success / failure result
export const getAllTodos = () => {
  const todos = TodoModel.getAllTodos();

  if (todos.length === 0) {
    return {
      statusCode: 404,
      error: "No todos found.",
    };
  } else {
    return {
      statusCode: 200,
      message: todos,
    };
  }
};

// fetch tody by id - return success / failure result
export const getTodoById = (todoId: string) => {
  const todo = TodoModel.getTodoById(todoId);

  if (!todo) {
    return {
      statusCode: 404,
      error: `No todo found with id: ${todoId}`,
    };
  } else {
    return {
      statusCode: 200,
      message: todo,
    };
  }
};

// update todo by id - return success / failure result
export const updateTodo = (id: string, title: string, description: string) => {
  const todo = TodoModel.udpateTodo(id, title, description);

  if (todo) {
    return {
      statusCode: 200,
      message: "Todo updated successfully",
    };
  } else {
    return {
      statusCode: 404,
      error: "Todo not found",
    };
  }
};
