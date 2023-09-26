import { RequestHandler } from "express";
import { User } from "@prisma/client";

export const getMyInformation: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    if (user) return res.status(200).json({ message: "autenticated", data: user });
    res.status(403).json({ message: "Not user data" });
  } catch (error) {
    next(error);
  }
};
