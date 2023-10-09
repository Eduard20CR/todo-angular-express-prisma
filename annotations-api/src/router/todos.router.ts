import { Router } from "express";
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controller/todos.controller";
import { createTodoValidator, deleteTodoValidator, getTodosByGroupIdValidator, updateTodoValidator } from "../validators/todos.validators";

const todosRouter = Router();

todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodosByGroupIdValidator, getTodoById);
todosRouter.post("/", createTodoValidator, createTodo);
todosRouter.put("/:id", updateTodoValidator, updateTodo);
todosRouter.delete("/:id/group/:groupId", deleteTodoValidator, deleteTodo);

export default todosRouter;
