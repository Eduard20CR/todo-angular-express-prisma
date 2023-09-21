import { Router } from "express";
import { createGroup, deleteGroup, getGroupById, getGroups, updateGroup } from "../controller/groups.controller";
import { createGroupValidator, deleteGroupValidator, getGroupByIdValidator, updateGroupValidator } from "../validators/groups.validators";

const groupsRouter = Router();

groupsRouter.get("/", getGroups);
groupsRouter.get("/:id", ...getGroupByIdValidator, getGroupById);
groupsRouter.post("/", ...createGroupValidator, createGroup);
groupsRouter.put("/:id", ...updateGroupValidator, updateGroup);
groupsRouter.delete("/:id", ...deleteGroupValidator, deleteGroup);

export default groupsRouter;
