import express from "express";
import { body } from "express-validator";

import authController from "../controllers/authController";
import User from "../models/userModel";

const router = express.Router();

router.post(
  "/signup",
  [
    body("username")
      .trim()
      .isLength({ min: 3, max: 16 })
      .withMessage("Must be between 3 and 16 characters long"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Email already exists!");
        }
      }),
    body("password")
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage("Must be between 4 and 16 characters long"),
  ],
  authController.signup
);

export default router;
