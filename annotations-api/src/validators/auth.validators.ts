import { body } from "express-validator";
import { validateFunction } from "./validate.function";

const email = body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email");

const password = body("password")
  .isString()
  .withMessage("Must be a string")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 6, max: 20 })
  .withMessage("Password must be at least 6 characters and max 20");

const confirmationPassword = body("confirmationPassword")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  })
  .notEmpty()
  .withMessage("Password confirmation is required")
  .isLength({ min: 6, max: 20 })
  .withMessage("Password must be at least 6 characters and max 20");

export const signUpUserValidator = [email, password, confirmationPassword, validateFunction];

export const signInUserValidator = [email, password, validateFunction];

export const emailAlreadyRegisteredValidator = [email, validateFunction];
