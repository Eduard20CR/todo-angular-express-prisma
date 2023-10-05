import { Router } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controller/notes.controller";
import { createNoteValidator, deleteNoteValidator, getNotesByGroupIdValidator, updateNoteValidator } from "../validators/notes.validators";

const notesRouter = Router();

// notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNotesByGroupIdValidator, getNoteById);
notesRouter.post("/", createNoteValidator, createNote);
notesRouter.put("/:id", updateNoteValidator, updateNote);
notesRouter.delete("/:id", deleteNoteValidator, deleteNote);

export default notesRouter;
