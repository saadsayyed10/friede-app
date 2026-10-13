import { Router } from "express";

import { syncClerkUserController } from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/signup", syncClerkUserController);

export default userRouter;
