import { Router } from "express";

import {
  deleteAllergyController,
  updateAllergyController,
} from "../controller/allergy.controller";

const allergyRouter = Router();

allergyRouter.put("/update", updateAllergyController);
allergyRouter.delete("/delete", deleteAllergyController);

export default allergyRouter;
