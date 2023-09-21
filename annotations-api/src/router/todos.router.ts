import { Router } from "express";
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from "../controller/todos.controller";

const todosRouter = Router();

todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodoById);
todosRouter.post("/", createTodo);
todosRouter.put("/:id", updateTodo);
todosRouter.delete("/:id", deleteTodo);

export default todosRouter;
