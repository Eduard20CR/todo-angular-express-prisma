import { Router } from "express";
import { createGroup, deleteGroup, getGroupById, getGroups, updateGroup } from "../controller/groups.controller";
import { createGroupValidator, deleteGroupValidator, getGroupByIdValidator, updateGroupValidator } from "../validators/groups.validators";

const groupsRoutes = Router();

groupsRoutes.get("/", getGroups);
groupsRoutes.get("/:id", ...getGroupByIdValidator, getGroupById);
groupsRoutes.post("/", ...createGroupValidator, createGroup);
groupsRoutes.put("/:id", ...updateGroupValidator, updateGroup);
groupsRoutes.delete("/:id", ...deleteGroupValidator, deleteGroup);

export default groupsRoutes;
