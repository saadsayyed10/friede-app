import express from "express";
import dns from "dns";

import { env } from "./config/env.config";
import { connectDB } from "./config/db.config";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = env.PORT;

connectDB();
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
