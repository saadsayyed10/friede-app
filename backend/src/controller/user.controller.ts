import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import {
  syncClerkUserService,
  updateBasicUserDetailsService,
  userProfileService,
  verifyAuthService,
} from "../services/user.service";

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

export const verifyAuthController = async (req: Request, res: Response) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      console.log("Unauthorized: User must be logged in to verify");
      return res.status(401).json({
        success: false,
        error: "Unauthorized: User must be logged in to verify",
      });
    }

    if (!userId) {
      console.log("Clerk ID is required to verify");
      return res.status(403).json({
        success: false,
        error: "Clerk ID is required to verify",
      });
    }

    const result = await verifyAuthService(userId);
    res.status(200).json({ success: true, result });
  } catch (error: any) {
    console.log(error.message);
    return res.status(403).json({ success: false, error: error.message });
  }
};

export const userProfileController = async (req: Request, res: Response) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      console.log("Unauthorized: User must be logged in to fetch profile");
      return res.status(401).json({
        success: false,
        error: "Unauthorized: User must be logged in to fetch profile",
      });
    }

    if (!userId) {
      console.log("Clerk ID is required to fetch profile");
      return res.status(403).json({
        success: false,
        error: "Clerk ID is required to fetch profile",
      });
    }

    const user = await userProfileService(userId);
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.log(error.message);
    return res.status(403).json({ success: false, error: error.message });
  }
};

export const updateBasicUserDetailsController = async (
  req: Request,
  res: Response,
) => {
  const { name, profilePictureUrl } = req.body;
  if (!name) {
    console.log("Name is required to update on the profile");
    return res.status(400).json({
      success: false,
      error: "Name is required to update on the profile",
    });
  }

  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated) {
      console.log("Unauthorized: User must be logged in to update profile");
      return res.status(401).json({
        success: false,
        error: "Unauthorized: User must be logged in to update profile",
      });
    }

    if (!userId) {
      console.log("Clerk ID is required to update profile");
      return res.status(403).json({
        success: false,
        error: "Clerk ID is required to update profile",
      });
    }

    const user = await updateBasicUserDetailsService(
      userId,
      name,
      profilePictureUrl,
    );
    res.status(200).json({
      success: true,
      message: "Your profile has been updated successfully",
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
