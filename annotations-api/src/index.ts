import express from "express";
import cors from "cors";
import passport from "passport";

import todosRouter from "./router/todos.router";
import notesRouter from "./router/notes.router";
import groupsRouter from "./router/groups.router";
import authRouter from "./router/auth.router";
import initPassportJwt from "./util/passport-jwt";
import usersRouter from "./router/users.router";
import errorHandlerMiddleware from "./middlewares/errorHandling.middleware";
import notFound from "./router/not-found.router";

const app = express();

initPassportJwt(passport);

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

// PROTECTED ROUTES
app.use("/api/users", passport.authenticate("jwt", { session: false }), usersRouter);
app.use("/api/groups", passport.authenticate("jwt", { session: false }), groupsRouter);
app.use("/api/todos", passport.authenticate("jwt", { session: false }), todosRouter);
app.use("/api/notes", passport.authenticate("jwt", { session: false }), notesRouter);
app.use("/api/notes", passport.authenticate("jwt", { session: false }), notesRouter);

app.use("/*", notFound);
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
