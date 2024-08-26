import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

// Define a custom request interface that includes the user
interface RequestUser extends Request {
  user?: any;
  
}

// JWT validation middleware
const validateJWT = async (req: RequestUser, res: Response, next: NextFunction) => {
  try {
    // Get the authorization header
    const authHeader = req.get("authorization");
    if (!authHeader) {
      return res.status(403).send("Authorization Header Was Not Provided");
    }

    // Split the authorization header to extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).send("Bearer token not found!");
    }

    // Verify the token
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "#SoXCs&QVu0KbR8BPmifUVaq46V5BX0I6EFWokiB&j6qRfF4nSJjaijQ5?3pOFgSp"
    ) as { email: string; firstName: string; lastName: string };

    if (!payload) {
      return res.status(403).send("Invalid Token");
    }

    // Fetch the user from the database using the payload email
    const user = await userModel.findOne({ email: payload.email });
    if (!user) {
      return res.status(403).send("User not found");
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send("Token verification failed");
  }
};

export default validateJWT;
