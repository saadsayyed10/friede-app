import axios from "axios";
import User from "../models/user.model";

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

  await axios.delete();
};
