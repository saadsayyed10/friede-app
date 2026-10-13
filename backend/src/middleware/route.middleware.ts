import { Router } from "express";

import userRouter from "../routes/user.route";

const mainRouter = Router();

mainRouter.use("/user", userRouter);

export default mainRouter;
