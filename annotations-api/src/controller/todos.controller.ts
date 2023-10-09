import { User } from "@prisma/client";
import { RequestHandler } from "express";
import prisma from "../db/prisma";
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
      select: {
        id: true,
        name: true,
        todo: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return res.json({ message: "ok", data: groupAndTodos });
  } catch (error) {
    next(error);
  }
};
export const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const { description, groupId } = req.body;

    const isUserGroup = await prisma.group.findUnique({ where: { id: Number(groupId), userId: Number(user.id) } });
    if (!isUserGroup) {
      throw new CustomError("Group not found", 404);
    }
    const newOrder = await prisma.todo.count({ where: { groupId: Number(groupId) } });

    const newTodo = await prisma.todo.create({ data: { groupId: Number(groupId), description, done: false, order: newOrder } });

    return res.json({ message: "created", data: newTodo });
  } catch (error) {
    next(error);
  }
};
export const updateTodo: RequestHandler = async (req, res, next) => {
  return res.json({});
};
export const deleteTodo: RequestHandler = async (req, res, next) => {
  try {
    const { id, groupId } = req.params;

    const user = req.user as User;

    const isUserGroup = await prisma.todo.findUnique({ where: { id: Number(id), group: { userId: Number(user.id) } } });
    if (!isUserGroup) throw new CustomError("Group not found", 404);

    const allTodos = await prisma.todo.findMany({ where: { groupId: Number(groupId) } });
    const reorderedTodos = allTodos
      .filter((todo) => todo.id !== Number(id))
      .map((todo, index) => {
        todo.order = index + 1;
        return todo;
      });

    await prisma.$transaction([
      prisma.todo.delete({ where: { id: Number(id) } }),
      ...reorderedTodos.map((todo) =>
        prisma.todo.update({
          where: { id: todo.id },
          data: { order: todo.order },
        })
      ),
    ]);

    return res.json({ message: "deleted", data: reorderedTodos });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
