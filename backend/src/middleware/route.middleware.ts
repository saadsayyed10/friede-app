import { Router } from "express";

import userRouter from "../routes/user.route";
import allergyRouter from "../routes/allergy.route";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/allergy", allergyRouter);

export default mainRouter;
