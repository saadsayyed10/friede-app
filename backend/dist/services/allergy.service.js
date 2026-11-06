"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllergyService = exports.updateAllergyService = void 0;
const axios_1 = __importDefault(require("axios"));
const user_model_1 = __importDefault(require("../models/user.model"));
const env_config_1 = require("../config/env.config");
const updateAllergyService = (clerkId, allergies) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ clerkId });
    if (!existingUser)
        throw new Error("User does not exist");
    const res = yield axios_1.default.delete(`${env_config_1.env.AI_AGENT_SERVER}/ai/allergy/${clerkId}`);
    const vectorDataDelete = res.data.message.message;
    const updateAllergy = yield user_model_1.default.updateOne({ clerkId }, { allergies });
    return { updateAllergy, vectorDataDelete };
});
exports.updateAllergyService = updateAllergyService;
const deleteAllergyService = (clerkId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ clerkId });
    if (!existingUser)
        throw new Error("User does not exist");
    yield user_model_1.default.updateOne({ clerkId }, { allergies: null });
    const res = yield axios_1.default.delete(`${env_config_1.env.AI_AGENT_SERVER}/ai/allergy/${clerkId}`);
    const vectorDataDelete = res.data.message.message;
    return vectorDataDelete;
});
exports.deleteAllergyService = deleteAllergyService;
