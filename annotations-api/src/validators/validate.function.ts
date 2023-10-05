import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const validateFunction: RequestHandler = async (req, res, next) => {
  const result = validationResult(req);
  console.log(result);

  if (result.isEmpty()) {
    return next();
  }
  const messages = result.array().map((val) => val.msg);

  return res.status(400).send({ errors: messages });
};
