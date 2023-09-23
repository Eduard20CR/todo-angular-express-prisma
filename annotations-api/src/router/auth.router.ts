import { Router } from "express";
import { emailAlreadyRegistered, signInUser, signUpUser } from "../controller/auth.controller";
import { emailAlreadyRegisteredValidator, signInUserValidator, signUpUserValidator } from "../validators/auth.validators";

const authRouter = Router();

authRouter.post("/sign-up", ...signUpUserValidator, signUpUser);
authRouter.post("/sign-in", ...signInUserValidator, signInUser);
authRouter.post("/email-already-registered", ...emailAlreadyRegisteredValidator, emailAlreadyRegistered);

export default authRouter;
