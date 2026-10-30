import axios from "axios";
import User from "../models/user.model";
import { env } from "../config/env.config";

export const updateAllergyService = async (
  clerkId: string,
  allergies: [
    {
      allergy: string;
      cause: string;
      risk: "Low" | "Moderate" | "High";
    },
  ],
) => {
  const existingUser = await User.findOne({ clerkId });
  if (!existingUser) throw new Error("User does not exist");

  const updateAllergy = await User.updateOne({ clerkId }, { allergies });
  return updateAllergy;
};

export const deleteAllergyService = async (clerkId: string) => {
  const existingUser = await User.findOne({ clerkId });
  if (!existingUser) throw new Error("User does not exist");

  await User.updateOne({ clerkId }, { allergies: null });

  const res = await axios.delete(
    `${env.AI_AGENT_SERVER}/ai/allergy/${clerkId}`,
  );

  const vectorDataDelete = res.data.message.message;

  return vectorDataDelete;
};
