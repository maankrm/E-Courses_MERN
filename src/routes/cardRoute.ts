import express, { Request, Response } from "express";
import { addItemToCard, getActiveCardForUse, updateItemInCard } from "../services/cardService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendedReq } from "../types/extendedRequest";

const router = express.Router();

// Route to get the active card for the authenticated user---------------------------------------------------------------------------
router.get("/", validateJWT, async (req: ExtendedReq, res: Response) => {
  try {
    // Extract the user ID from the authenticated request object
    const userId = req.user?._id;

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

// create a new card-------------------------------------------------------------------------------------------------------------------
router.post("/items", validateJWT, async (req: ExtendedReq, res: Response) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;
  const response = await addItemToCard({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

// update card--------------------------------------------------------------------------------------------------------------------------

router.put("/items", validateJWT, async (req: ExtendedReq, res: Response) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;
  const response = await updateItemInCard({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

export default router;
