import { Router } from "express";
import { signInUser, signUpUser } from "../controller/auth.controller";
import { signUpUserValidator } from "../validators/auth.validators";

const authRouter = Router();

authRouter.get("/sign-up", signUpUserValidator, signUpUser);
authRouter.get("/sign-in", signInUser);

export default authRouter;
