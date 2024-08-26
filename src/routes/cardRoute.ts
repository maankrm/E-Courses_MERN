import express, { Request, Response } from "express";
import { getActiveCardForUse } from "../services/cardService";
import validateJWT from "../middlewares/validateJWT";

// Extend the Express Request interface
interface RequestUser extends Request {
  user?: {
    _id: string;
    // add other user properties
  };
}

const router = express.Router();

// Route to get the active card for the authenticated user
router.get("/", validateJWT, async (req: RequestUser, res: Response) => {
  try {
    // Extract the user ID from the authenticated request object
    const userId: "string" = req.user?._id as "string";

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    // Fetch the active card for the user
    const card = await getActiveCardForUse({ userId });

    // Return the active card
    res.status(200).json(card);
  } catch (error) {
    // Handle any errors that occur during the process
    res
      .status(500)
      .json({ message: "An error occurred while fetching the card", error });
  }
});

export default router;
