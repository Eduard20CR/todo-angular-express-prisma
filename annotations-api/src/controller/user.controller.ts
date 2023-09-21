import { RequestHandler } from "express";
import prisma from "../db/prisma";

export const getUsers: RequestHandler = async (req, res, next) => {
  const Users = await prisma.user.findMany();
  return res.json(Users);
};
export const getUserById: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  const User = await prisma.user.findUnique({ where: { id } });
  return res.json(User);
};
export const createUser: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;
  const User = await prisma.user.create({ data: { name, email, password } });
  res.json(User);
};
export const updateUser: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  const updatedTodo = await prisma.user.update({ where: { id }, data: req.body });

  return res.json(updatedTodo);
};
export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id } });
    return res.json({ message: "User deleted" });
  } catch (error) {
    return next(error);
  }
};
