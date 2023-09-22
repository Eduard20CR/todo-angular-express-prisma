import { Router } from "express";
import { getMyInformation } from "../controller/users.controller";

const usersRouter = Router();

usersRouter.get("/me", getMyInformation);

export default usersRouter;
