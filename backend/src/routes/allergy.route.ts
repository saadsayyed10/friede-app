import { Router } from "express";

import { updateAllergyController } from "../controller/allergy.controller";

const allergyRouter = Router();

allergyRouter.put("/update", updateAllergyController);

export default allergyRouter;
