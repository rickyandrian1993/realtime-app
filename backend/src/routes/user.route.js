import { Router } from "express";
import { createUser, getAccessToken, getRefreshToken } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.get("/users/:id", getAccessToken);
userRouter.get("/refresh", getRefreshToken);

export default userRouter;
