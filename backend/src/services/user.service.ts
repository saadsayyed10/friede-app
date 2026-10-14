import User from "../models/user.model";

export const syncClerkUserService = async (
  clerkId: string,
  name: string,
  email: string,
  profilePictureUrl: string,
) => {
  const user = await User.create({ clerkId, name, email, profilePictureUrl });
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
