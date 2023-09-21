import express from "express";
import todosRouter from "./router/todos.router";
import notesRouter from "./router/notes.router";
import { errorHandlerMiddleware } from "./middlewares/errorHandling.middleware";
import groupsRoutes from "./router/groups.router";
import usersRoutes from "./router/users.router";

// const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/groups", groupsRoutes);
app.use("/todos", todosRouter);
app.use("/notes", notesRouter);

app.use(errorHandlerMiddleware);

const server = app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
