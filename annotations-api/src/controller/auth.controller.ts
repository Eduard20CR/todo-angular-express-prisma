import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import prisma from "../db/prisma";
import { CustomError } from "../util/errorUtil";
import { sign } from "jsonwebtoken";

export const signUpUser: RequestHandler = async (req, res, next) => {
  try {
    const userAlreadyExist = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (userAlreadyExist) throw new CustomError("User already exist", 400);

    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPasword = await bcrypt.hash(password, salt);

    const { password: passwordFromDB, ...user } = await prisma.user.create({ data: { email, password: hashPasword, role: { connect: { id: 1 } } } });

    return res.json({ message: "User created", user });
  } catch (error) {
    next(error);
  }
};
export const signInUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new CustomError("Invalid used credentials", 400);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(400).json({ message: "Invalid used credentials" });

    const jwt = sign({ id: user.id, email: user.email, role: user.roleId }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    return res.json({ message: "User logged in", token: jwt });
  } catch (error) {
    next(error);
  }
};
export const emailAlreadyRegistered: RequestHandler = async (req, res, next) => {
  try {
    let exists = { exists: false };
    const email = req.body.email;
    const userAlreadyExist = await prisma.user.findUnique({ where: { email } });
    if (userAlreadyExist) exists = { exists: true };
    res.status(200).json(exists);
  } catch (error) {
    next(error);
  }
};
