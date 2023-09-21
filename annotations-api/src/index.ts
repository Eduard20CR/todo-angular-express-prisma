import express from "express";
import cors from "cors";
import passport from "passport";

import todosRouter from "./router/todos.router";
import notesRouter from "./router/notes.router";
import { errorHandlerMiddleware } from "./middlewares/errorHandling.middleware";
import groupsRouter from "./router/groups.router";
import authRouter from "./router/auth.router";
import initPassportJwt from "./util/passport-jwt";

// const prisma = new PrismaClient();
const app = express();

initPassportJwt(passport);

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/groups", passport.authenticate("jwt", { session: false }), groupsRouter);
app.use("/todos", todosRouter);
app.use("/notes", notesRouter);

app.use(errorHandlerMiddleware);

const server = app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
