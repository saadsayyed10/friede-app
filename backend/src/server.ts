import express from "express";
import dns from "dns";
import cors from "cors";

import { env } from "./config/env.config";
import { connectDB } from "./config/db.config";
import { clerkMiddleware } from "@clerk/express";
import mainRouter from "./middleware/route.middleware";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use("/api", mainRouter);

connectDB();
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
