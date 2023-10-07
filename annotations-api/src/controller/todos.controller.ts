import { User } from "@prisma/client";
import { RequestHandler } from "express";
import prisma from "../db/prisma";
import { body } from "express-validator";
import { CustomError } from "../util/errorUtil";

export const getTodos: RequestHandler = async (req, res, next) => {
  return res.json({ message: "ok" });
};
export const getTodoById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user as User;

    const groupAndTodos = await prisma.group.findUnique({
      where: { id: Number(id), userId: user.id },
      select: { id: true, name: true, todo: true },
    });

    return res.json({ message: "ok", data: groupAndTodos });
  } catch (error) {
    next(error);
  }
};
export const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const { description, order, groupId } = req.body;
    console.log(order);

    const isUserGroup = await prisma.group.findUnique({ where: { id: Number(groupId), userId: Number(user.id) } });
    if (!isUserGroup) {
      throw new CustomError("Group not found", 404);
    }

    const newTodo = await prisma.todo.create({ data: { groupId: Number(groupId), description, done: false, order: Number(order) } });
    console.log(newTodo);

    return res.json({ message: "created", data: newTodo });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
export const updateTodo: RequestHandler = async (req, res, next) => {
  return res.json({});
};
export const deleteTodo: RequestHandler = async (req, res, next) => {
  return res.json({});
};
