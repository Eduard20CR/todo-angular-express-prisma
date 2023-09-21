import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const validateFunction: RequestHandler = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.send({ errors: result.array() });
};
