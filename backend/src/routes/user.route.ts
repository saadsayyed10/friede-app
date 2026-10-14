import { Router } from "express";

import {
  syncClerkUserController,
  updateBasicUserDetailsController,
  userProfileController,
  verifyAuthController,
} from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/signup", syncClerkUserController);

userRouter.get("/verify", verifyAuthController);
userRouter.get("/profile", userProfileController);

userRouter.put("/update/basic", updateBasicUserDetailsController);

export default userRouter;
