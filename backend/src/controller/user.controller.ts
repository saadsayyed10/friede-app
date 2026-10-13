import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import { syncClerkUserService } from "../services/user.service";

export const syncClerkUserController = async (req: Request, res: Response) => {
  const { name, email, profilePictureUrl } = req.body;
  if (!name || !email) {
    console.log("Name and Email are required to sync");
    return res
      .status(400)
      .json({ success: false, error: "Name and Email are required to sync" });
  }

  try {
    const { isAuthenticated, userId } = getAuth(req);

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

    const user = await syncClerkUserService(
      userId,
      name,
      email,
      profilePictureUrl,
    );
    res.status(201).json({
      success: true,
      message: `Dear ${name} your account is successfully registered to the Friede.`,
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
