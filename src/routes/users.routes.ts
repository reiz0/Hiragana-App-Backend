import { Router } from "express";
import { getUsersById, login, register } from "../controllers/users.controller";

export const UserRouter = Router();

UserRouter.get("/:userId", getUsersById);
UserRouter.post("/login", login);
UserRouter.post("/register", register);
