import express from "express";
import { login, register } from "../services/userService";

// Express router to create endpoints for user
const router = express.Router();

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(statusCode).send(data);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while registering the user." });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({
      email,
      password,
    });

    res.status(statusCode).send(data);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while logging in." });
  }
});

export default router;
