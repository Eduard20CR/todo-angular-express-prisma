import { RequestHandler } from "express";
import prisma from "../db/prisma";
import { User } from "@prisma/client";

export const getGroups: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const groups = await prisma.group.findMany({ where: { userId: user.id } });

    return res.status(200).json({ message: "done", data: groups });
  } catch (error) {
    next(error);
  }
};
export const getGroupById: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const id = Number(req.params.id);
    const group = await prisma.group.findUnique({ where: { id, userId: user.id } });

    if (!group) return res.status(404).json({ message: "Group not found" });

    return res.status(200).json({ data: group });
  } catch (error) {
    next(error);
  }
};
export const createGroup: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const { name } = req.body;
    const group = await prisma.group.create({ data: { name, userId: user.id }, select: { id: true, name: true } });
    res.json({ message: "created", data: group });
  } catch (error) {
    next(error);
  }
};
export const updateGroup: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const id = Number(req.params.id);
    const { name } = req.body;

    const updatedTodo = await prisma.group.update({ where: { id, userId: user.id }, data: { name } });

    return res.json({ message: "updated", data: updatedTodo });
  } catch (error) {
    next(error);
  }
};
export const deleteGroup: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const id = Number(req.params.id);

    await prisma.group.delete({ where: { id, userId: user.id } });

    return res.json({ message: "Group deleted", data: id });
  } catch (error) {
    console.log(error);

    return next(error);
  }
};
