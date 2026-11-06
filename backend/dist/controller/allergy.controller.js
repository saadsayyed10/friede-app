"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteAllergyController = exports.updateAllergyController = void 0;
const express_1 = require("@clerk/express");
const allergyServices = __importStar(require("../services/allergy.service"));
const updateAllergyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { userId } = req.query;
    const { allergies } = req.body;
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
        const { updateAllergy: allergy, vectorDataDelete } = yield allergyServices.updateAllergyService(userId, allergies);
        res.status(200).json({ success: true, allergy, message: vectorDataDelete });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.updateAllergyController = updateAllergyController;
const deleteAllergyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { userId } = req.query;
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
        const allergy = yield allergyServices.deleteAllergyService(userId);
        res.status(200).json({ success: true, message: allergy });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.deleteAllergyController = deleteAllergyController;
