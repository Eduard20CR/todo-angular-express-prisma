import { body, param } from "express-validator";
import { validateFunction } from "./validate.function";

export const getGroupByIdValidator = [param("id").isInt().withMessage("Id must be an integer"), validateFunction];

export const createGroupValidator = [body("name").isString(), validateFunction];

export const updateGroupValidator = [param("id").isInt().withMessage("Id must be an integer"), body("name").isString(), validateFunction];

export const deleteGroupValidator = [param("id").isInt().withMessage("Id must be an integer"), validateFunction];
