import mongoose from "mongoose";
import { env } from "./env.config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.DATABASE_URL);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Failed to connect to MongoDB: ${error.message}`);
  }
};
