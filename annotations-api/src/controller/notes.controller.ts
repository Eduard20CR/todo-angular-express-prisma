import { RequestHandler } from "express";
import prisma from "../db/prisma";

export const getNotes: RequestHandler = async (req, res) => {
  const notes = await prisma.note.findMany();
  return res.json(notes);
};
export const getNoteById: RequestHandler = async (req, res) => {
  const id = req.params.id ?? "-1";
  if (id === "-1") {
    return res.status(400).json({ message: "Invalid id" });
  }
  const note = await prisma.note.findUnique({ where: { id: 1 } });
  return res.json(note);
};
export const createNote: RequestHandler = async (req, res) => {
  return res.json();
};
export const updateNote: RequestHandler = async (req, res) => {
  return res.json({});
};
export const deleteNote: RequestHandler = async (req, res) => {
  return res.json({});
};
