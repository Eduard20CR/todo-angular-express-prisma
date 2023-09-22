import { User } from "@prisma/client";
import { RequestHandler } from "express";
import { ROLES } from "../constants/role.enum";

const verifyRole = (role: ROLES): RequestHandler => {
  return (req, _, next) => {
    try {
      const { roleId } = req.user as User;
      if (roleId === role) return next();
      throw new Error("Unauthorized");
    } catch (error) {
      next(error);
    }
  };
};

export default verifyRole;
