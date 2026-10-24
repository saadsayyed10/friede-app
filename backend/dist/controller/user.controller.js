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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccountController = exports.updateBasicUserDetailsController = exports.userProfileController = exports.verifyAuthController = exports.syncClerkUserController = void 0;
const express_1 = require("@clerk/express");
const user_service_1 = require("../services/user.service");
const syncClerkUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, profilePictureUrl } = req.body;
    if (!name || !email) {
        console.log("Name and Email are required to sync");
        return res
            .status(400)
            .json({ success: false, error: "Name and Email are required to sync" });
    }
    try {
        const { isAuthenticated, userId } = (0, express_1.getAuth)(req);
        if (!isAuthenticated) {
            console.log("Unauthorized: User must be logged in to sync");
            return res.status(401).json({
                success: false,
                error: "Unauthorized: User must be logged in to sync",
            });
        }
        if (!userId) {
            console.log("Clerk ID is required to sync");
            return res.status(403).json({
                success: false,
                error: "Clerk ID is required to sync",
            });
        }
        const user = yield (0, user_service_1.syncClerkUserService)(userId, name, email, profilePictureUrl);
        res.status(201).json({
            success: true,
            message: `Dear ${name} your account is successfully registered to the Friede.`,
            user,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.syncClerkUserController = syncClerkUserController;
const verifyAuthController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isAuthenticated, userId } = (0, express_1.getAuth)(req);
        if (!isAuthenticated) {
            console.log("Unauthorized: User must be logged in to verify");
            return res.status(401).json({
                success: false,
                error: "Unauthorized: User must be logged in to verify",
            });
        }
        if (!userId) {
            console.log("Clerk ID is required to verify");
            return res.status(403).json({
                success: false,
                error: "Clerk ID is required to verify",
            });
        }
        const result = yield (0, user_service_1.verifyAuthService)(userId);
        res.status(200).json({ success: true, result });
    }
    catch (error) {
        console.log(error.message);
        return res.status(403).json({ success: false, error: error.message });
    }
});
exports.verifyAuthController = verifyAuthController;
const userProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isAuthenticated, userId } = (0, express_1.getAuth)(req);
        if (!isAuthenticated) {
            console.log("Unauthorized: User must be logged in to fetch profile");
            return res.status(401).json({
                success: false,
                error: "Unauthorized: User must be logged in to fetch profile",
            });
        }
        if (!userId) {
            console.log("Clerk ID is required to fetch profile");
            return res.status(403).json({
                success: false,
                error: "Clerk ID is required to fetch profile",
            });
        }
        const user = yield (0, user_service_1.userProfileService)(userId);
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.log(error.message);
        return res.status(403).json({ success: false, error: error.message });
    }
});
exports.userProfileController = userProfileController;
const updateBasicUserDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, profilePictureUrl } = req.body;
    if (!name) {
        console.log("Name is required to update on the profile");
        return res.status(400).json({
            success: false,
            error: "Name is required to update on the profile",
        });
    }
    try {
        const { isAuthenticated, userId } = (0, express_1.getAuth)(req);
        if (!isAuthenticated) {
            console.log("Unauthorized: User must be logged in to update profile");
            return res.status(401).json({
                success: false,
                error: "Unauthorized: User must be logged in to update profile",
            });
        }
        if (!userId) {
            console.log("Clerk ID is required to update profile");
            return res.status(403).json({
                success: false,
                error: "Clerk ID is required to update profile",
            });
        }
        const user = yield (0, user_service_1.updateBasicUserDetailsService)(userId, name, profilePictureUrl);
        res.status(200).json({
            success: true,
            message: "Your profile has been updated successfully",
            user,
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateBasicUserDetailsController = updateBasicUserDetailsController;
const deleteUserAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isAuthenticated, userId } = (0, express_1.getAuth)(req);
        if (!isAuthenticated) {
            console.log("Unauthorized: User must be logged in to delete profile");
            return res.status(401).json({
                success: false,
                error: "Unauthorized: User must be logged in to delete profile",
            });
        }
        if (!userId) {
            console.log("Clerk ID is required to delete profile");
            return res.status(403).json({
                success: false,
                error: "Clerk ID is required to delete profile",
            });
        }
        yield (0, user_service_1.deleteUserAccountService)(userId);
        res.status(200).json({
            success: true,
            message: "Your profile has been deleted successfully",
        });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteUserAccountController = deleteUserAccountController;
