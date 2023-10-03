import { RequestHandler } from "express";
import prisma from "../db/prisma";
import { User } from "@prisma/client";

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
    const notes = await prisma.group.findUnique({ where: { id: groupId, userId: user.id }, include: { notes: true } });

    return res.status(200).json({
      message: "ok",
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};
export const createNote: RequestHandler = async (req, res, next) => {
  return res.json();
};
export const updateNote: RequestHandler = async (req, res, next) => {
  return res.json({});
};
export const deleteNote: RequestHandler = async (req, res, next) => {
  return res.json({});
};
