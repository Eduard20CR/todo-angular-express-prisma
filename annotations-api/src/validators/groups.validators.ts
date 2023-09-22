import { body, checkExact, param } from "express-validator";
import { validateFunction } from "./validate.function";

const idParam = param("id").isInt().withMessage("Id must be an integer");
const nameBody = body("name").isString();

export const getGroupByIdValidator = [idParam, validateFunction];

export const createGroupValidator = [nameBody, validateFunction];

export const updateGroupValidator = [idParam, nameBody, validateFunction];

export const deleteGroupValidator = [idParam, validateFunction];
