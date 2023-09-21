import { RequestHandler } from "express";
import prisma from "../db/prisma";
import { CustomError } from "../util/errorUtil";
import { Prisma } from "@prisma/client";

export const signUpUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.create({ data: { email, password } });

    return res.json({ message: "User created" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return next(new CustomError("User already exist", 400));
    }

    next(new CustomError("Server error", 500));
  }
};
export const signInUser: RequestHandler = async (req, res, next) => {
  return res.json({ message: "User signed in" });
};
