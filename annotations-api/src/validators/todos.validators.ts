import { body, param } from "express-validator";
import { validateFunction } from "./validate.function";

const idParam = param("id").isInt().withMessage("Id must be an integer");
const idGroupParam = param("groupId").isInt().withMessage("Id must be an integer");

const groupId = body("groupId").isString();
const descriptionBody = body("description").isString().isLength({ min: 1, max: 255 });
const descriptionBodyNotRequired = descriptionBody.optional();
const descriptionBodyRequired = descriptionBody.notEmpty();

export const getTodosByGroupIdValidator = [idParam, validateFunction];

export const createTodoValidator = [descriptionBodyRequired, groupId, validateFunction];

export const updateTodoValidator = [idParam, descriptionBodyNotRequired, validateFunction];

export const deleteTodoValidator = [idParam, idGroupParam, validateFunction];
