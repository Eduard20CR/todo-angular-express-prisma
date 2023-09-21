import { RequestHandler } from "express";
import prisma from "../db/prisma";

export const signUpUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { password: hashedPassword, ...user } = await prisma.user.create({ data: { email, password } });
    return res.json({ message: "User created", user });
  } catch (error) {
    next(error);
  }
};
export const signInUser: RequestHandler = async (req, res, next) => {
  return res.json({ message: "User signed in" });
};
