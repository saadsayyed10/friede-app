import { Router } from "express";

import {
  syncClerkUserController,
  verifyAuthController,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/signup", syncClerkUserController);

userRouter.get("/verify", verifyAuthController);

export default userRouter;
