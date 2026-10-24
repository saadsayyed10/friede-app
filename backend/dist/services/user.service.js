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
exports.deleteUserAccountService = exports.updateBasicUserDetailsService = exports.userProfileService = exports.verifyAuthService = exports.syncClerkUserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const syncClerkUserService = (clerkId, name, email, profilePictureUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser)
        throw new Error("User account already exists in Friede");
    const user = yield user_model_1.default.create({ clerkId, name, email, profilePictureUrl });
    return user;
});
exports.syncClerkUserService = syncClerkUserService;
const verifyAuthService = (clerkId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ clerkId });
    if (existingUser) {
        return true;
    }
    return false;
});
exports.verifyAuthService = verifyAuthService;
const userProfileService = (clerkId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ clerkId });
    if (!user) {
        throw new Error("User with this Clerk ID do not exist in database");
    }
    return user;
});
exports.userProfileService = userProfileService;
const updateBasicUserDetailsService = (clerkId, name, profilePictureUrl) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.updateOne({ clerkId }, { name, profilePictureUrl });
});
exports.updateBasicUserDetailsService = updateBasicUserDetailsService;
const deleteUserAccountService = (clerkId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteOne({ clerkId });
});
exports.deleteUserAccountService = deleteUserAccountService;
