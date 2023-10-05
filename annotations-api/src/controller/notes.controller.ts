import { RequestHandler } from "express";
import prisma from "../db/prisma";
import { User } from "@prisma/client";
import { CustomError } from "../util/errorUtil";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const groupId = Number(req.params.groupId);
    console.log(groupId);
    const notes = await prisma.note.findMany({ where: { groupId } });

    return res.json(notes);
  } catch (error) {
    next(error);
  }
};
export const getNoteById: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const groupId = Number(req.params.id);
    const notes = await prisma.group.findUnique({
      where: { id: groupId, userId: user.id },
      include: {
        notes: {
          select: {
            id: true,
            title: true,
            content: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "ok",
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};
export const createNote: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const { groupId, title, content } = req.body;
    const numberGroupId = Number(groupId);

    const isIserGroup = await prisma.group.findUnique({ where: { id: numberGroupId, userId: user.id } });
    if (!isIserGroup) {
      throw new CustomError("Group not found", 404);
    }
    const newNote = await prisma.note.create({
      data: { title, content, groupId: numberGroupId },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return res.json({
      message: "ok",
      data: newNote,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
export const updateNote: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user as User;
    const body = req.body;

    console.log(body);

    const updatedNote = await prisma.note.update({
      where: {
        id: Number(id),
        group: {
          userId: user.id,
        },
      },
      data: {
        ...body,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return res.json({
      message: "ok",
      data: updatedNote,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
export const deleteNote: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as User;
    const id = req.params.id;

    const deletedNote = await prisma.note.delete({
      where: {
        id: Number(id),
        group: {
          userId: user.id,
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return res.status(200).json({ message: "deleted", data: deletedNote });
  } catch (error) {
    next(error);
  }
};
