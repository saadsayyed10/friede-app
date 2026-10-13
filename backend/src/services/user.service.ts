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
