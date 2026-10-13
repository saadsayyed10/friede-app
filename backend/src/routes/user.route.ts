import { requireAuth } from "@clerk/express";
import { Router } from "express";

import { syncClerkUserController } from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/signup", requireAuth(), syncClerkUserController);

export default userRouter;
