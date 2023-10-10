import { Router } from "express";
import { changeOrder, createTodo, deleteTodo, getTodoById, getTodos, toggleCompleted, updateTodo } from "../controller/todos.controller";
import {
  createTodoValidator,
  deleteTodoValidator,
  getTodosByGroupIdValidator,
  toggleTodoValidator,
  updateTodoValidator,
} from "../validators/todos.validators";

const todosRouter = Router();

todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodosByGroupIdValidator, getTodoById);
todosRouter.post("/", createTodoValidator, createTodo);
todosRouter.put("/toggle/:id", toggleTodoValidator, toggleCompleted);
todosRouter.put("/order", changeOrder);
todosRouter.put("/:id", updateTodoValidator, updateTodo);
todosRouter.delete("/:id/group/:groupId", deleteTodoValidator, deleteTodo);

export default todosRouter;
