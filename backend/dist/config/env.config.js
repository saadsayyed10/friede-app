"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DATABASE_URL,
    AI_AGENT_SERVER: process.env.AI_AGENT_SERVER || "http://localhost:8000/api",
};
