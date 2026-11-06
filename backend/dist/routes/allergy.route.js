"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const allergy_controller_1 = require("../controller/allergy.controller");
const allergyRouter = (0, express_1.Router)();
allergyRouter.put("/update", allergy_controller_1.updateAllergyController);
allergyRouter.delete("/delete", allergy_controller_1.deleteAllergyController);
exports.default = allergyRouter;
