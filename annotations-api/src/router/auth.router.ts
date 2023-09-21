import { Router } from "express";
import { signInUser, signUpUser } from "../controller/auth.controller";
import { signInUserValidator, signUpUserValidator } from "../validators/auth.validators";

const authRouter = Router();

authRouter.get("/sign-up", signUpUserValidator, signUpUser);
authRouter.get("/sign-in", signInUserValidator, signInUser);

export default authRouter;
