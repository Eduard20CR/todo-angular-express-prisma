import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import prisma from "../db/prisma";
import { CustomError } from "../util/errorUtil";
import { JwtPayload, sign, verify } from "jsonwebtoken";

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

    if (!user) throw new CustomError("Invalid user credentials", 401);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new CustomError("Invalid user credentials", 401);

    const jwt = sign({ id: user.id, email: user.email, role: user.roleId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.cookie("jwt", jwt, { httpOnly: true, maxAge: 3600000 });

    return res.json({
      message: "User logged in",
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.roleId,
        },
      },
    });
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
export const me: RequestHandler = async (req, res, next) => {
  const response: {
    message: string;
    data: {
      user: {
        id: string;
        email: string;
        role: string;
      } | null;
    };
  } = { message: "Not authenticated", data: { user: null } };

  if (!req.cookies["jwt"]) return res.status(401).json(response);

  const user = await verify(req.cookies["jwt"], process.env.JWT_SECRET!);
  if (user === undefined) return res.status(401).json(response);

  response.data.user = {
    id: (user as JwtPayload).id,
    email: (user as JwtPayload).email,
    role: (user as JwtPayload).role,
  };
  response.message = "Authenticated";
  return res.status(200).json(response);
};
export const logOut: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    next(error);
  }
};
