import { Router } from "express";
import { emailAlreadyRegistered, me, signInUser, signUpUser } from "../controller/auth.controller";
import { emailAlreadyRegisteredValidator, signInUserValidator, signUpUserValidator } from "../validators/auth.validators";

const authRouter = Router();

authRouter.post("/sign-up", ...signUpUserValidator, signUpUser);
authRouter.post("/sign-in", ...signInUserValidator, signInUser);
authRouter.post("/email-already-registered", ...emailAlreadyRegisteredValidator, emailAlreadyRegistered);
authRouter.get("/me", me);

export default authRouter;
