import { RequestHandler } from "express";
import prisma from "../db/prisma";

export const getGroups: RequestHandler = async (req, res, next) => {
  const groups = await prisma.group.findMany();
  return res.json(groups);
};
export const getGroupById: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  const group = await prisma.group.findUnique({ where: { id } });
  return res.json(group);
};
export const createGroup: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  const group = await prisma.group.create({ data: { name, userId: 1 } });
  res.json(group);
};
export const updateGroup: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  const updatedTodo = await prisma.group.update({ where: { id }, data: req.body });

  return res.json(updatedTodo);
};
export const deleteGroup: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.group.delete({ where: { id } });
    return res.json({ message: "Group deleted" });
  } catch (error) {
    return next(error);
  }
};
