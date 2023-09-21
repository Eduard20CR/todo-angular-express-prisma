import { body } from "express-validator";
import { validateFunction } from "./validate.function";

export const signUpUserValidator = [
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
  body("password").isString().withMessage("Must be a string").notEmpty().withMessage("Password is required"),
  body("confirmationPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    })
    .notEmpty()
    .withMessage("Password confirmation is required"),
  validateFunction,
];

export const signInUserValidator = [body("email").isEmail().notEmpty(), body("password").isString().notEmpty(), validateFunction];
