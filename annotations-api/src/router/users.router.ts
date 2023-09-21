import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controller/user.controller";

const usersRoutes = Router();

usersRoutes.get("/", getUsers);
usersRoutes.get("/:id", getUserById);
usersRoutes.post("/", createUser);
usersRoutes.put("/:id", updateUser);
usersRoutes.delete("/:id", deleteUser);

export default usersRoutes;
