import { Router } from "express";

import {
  syncClerkUserController,
  userProfileController,
  verifyAuthController,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/signup", syncClerkUserController);

userRouter.get("/verify", verifyAuthController);
userRouter.get("/profile", userProfileController);

export default userRouter;
