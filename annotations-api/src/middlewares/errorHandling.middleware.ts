import e, { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../util/errorUtil";
import { Prisma } from "@prisma/client";

const prismaErrorHandling = (error: Prisma.PrismaClientKnownRequestError, req: Request, res: Response, next: NextFunction) => {
  switch (error.code) {
    case "P2025":
      res.status(404).json({ errors: [error.meta] });
      break;
    case "P2002":
      res.status(400).json({ errors: [error.meta] });
      break;
    default:
      res.status(500).json({ message: ["Server Error"] });
      break;
  }
};

const customErrorHandling = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.code).json({ errors: [error.message] });
};

const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return customErrorHandling(error, req, res, next);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return prismaErrorHandling(error, req, res, next);
  }

  res.status(500).json({ message: error?.message });
};

export default errorHandlerMiddleware;
