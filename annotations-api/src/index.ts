import express from "express";
import cors from "cors";
import passport from "passport";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import todosRouter from "./router/todos.router";
import notesRouter from "./router/notes.router";
import groupsRouter from "./router/groups.router";
import authRouter from "./router/auth.router";
import initPassportJwt from "./util/passport-jwt";
import usersRouter from "./router/users.router";
import errorHandlerMiddleware from "./middlewares/errorHandling.middleware";
import notFound from "./router/not-found.router";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
// prettier-ignore
app.use(cors({ origin: "http://localhost:4200", credentials: true,}));
app.use(morgan("dev"));
initPassportJwt(passport);

app.use("/api/auth", authRouter);

// PROTECTED ROUTES
app.use("/api/users", passport.authenticate("jwt", { session: false }), usersRouter);
app.use("/api/groups", passport.authenticate("jwt", { session: false }), groupsRouter);
app.use("/api/todos", passport.authenticate("jwt", { session: false }), todosRouter);
app.use("/api/notes", passport.authenticate("jwt", { session: false }), notesRouter);

app.use("/*", notFound);
app.use(errorHandlerMiddleware);

app.listen(Number(process.env.PORT!), () => {
  console.log(`Server is running on http://localhost:${process.env.PORT!}`);
});
