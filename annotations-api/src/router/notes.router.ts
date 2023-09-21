import { Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controller/notes.controller";

const notesRouter = Router();

notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.post("/", createNote);
notesRouter.put("/:id", updateNote);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;
