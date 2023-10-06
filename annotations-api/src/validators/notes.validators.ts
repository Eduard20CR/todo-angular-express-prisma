import { body, param } from "express-validator";
import { validateFunction } from "./validate.function";

const idParam = param("id").isInt().withMessage("Id must be an integer");

const titleBody = body("title").isString().isLength({ min: 1, max: 255 });
const contentBody = body("content").isString().isLength({ min: 1, max: 1000 });
const titleBodyNotRequired = titleBody.optional();
const contentBodyNotRequired = contentBody.optional();
const titleBodyRequired = titleBody.notEmpty();
const contentBodyRequired = contentBody.notEmpty();

export const getNotesByGroupIdValidator = [idParam, validateFunction];

export const createNoteValidator = [titleBodyRequired, contentBodyRequired, validateFunction];

export const updateNoteValidator = [idParam, titleBodyNotRequired, contentBodyNotRequired, validateFunction];

export const deleteNoteValidator = [idParam, validateFunction];
