import User from "../models/user.model";

type AllergyType = {
  allergies: [
    {
      allergy: string;
      cause: string;
      risk: "Low" | "Moderate" | "High";
    },
  ];
};

export const syncClerkUserService = async (
  clerkId: string,
  name: string,
  email: string,
  allergies: [
    {
      allergy: string;
      cause: string;
      risk: "Low" | "Moderate" | "High";
    },
  ],
  profilePictureUrl: string,
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User account already exists in Friede");

  const user = await User.create({
    clerkId,
    name,
    email,
    allergies,
    profilePictureUrl,
  });
  return user;
};

export const verifyAuthService = async (clerkId: string) => {
  const existingUser = await User.findOne({ clerkId });
  if (existingUser) {
    return true;
  }

  return false;
};

export const userProfileService = async (clerkId: string) => {
  const user = await User.findOne({ clerkId });
  if (!user) {
    throw new Error("User with this Clerk ID do not exist in database");
  }

  return user;
};

export const updateBasicUserDetailsService = async (
  clerkId: string,
  name: string,
  profilePictureUrl: string,
) => {
  return await User.updateOne({ clerkId }, { name, profilePictureUrl });
};

export const deleteUserAccountService = async (clerkId: string) => {
  await User.deleteOne({ clerkId });
};
