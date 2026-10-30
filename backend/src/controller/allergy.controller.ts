import { Request, Response } from "express";
import { getAuth } from "@clerk/express";

import * as allergyServices from "../services/allergy.service";

export const updateAllergyController = async (req: Request, res: Response) => {
  const { userId } = req.query;

  const { allergies } = req.body;

  try {
    // const { isAuthenticated, userId } = getAuth(req);
    // if (!isAuthenticated) {
    //   console.log("Unauthorized: User must be logged in to sync");
    //   return res.status(401).json({
    //     success: false,
    //     error: "Unauthorized: User must be logged in to sync",
    //   });
    // }
    // if (!userId) {
    //   console.log("Clerk ID is required to sync");
    //   return res.status(403).json({
    //     success: false,
    //     error: "Clerk ID is required to sync",
    //   });
    // }

    const allergy = await allergyServices.updateAllergyService(
      userId as string,
      allergies,
    );

    res.status(200).json({ success: true, allergy });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
