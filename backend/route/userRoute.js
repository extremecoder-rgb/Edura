import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser, updateProfile } from "../controller/userController.js";
import { uploadMiddleware } from "../middleware/multer.js"; // ✅ use custom middleware with logging

const userRouter = express.Router();

// Get logged-in user's data
userRouter.get("/getcurrentuser", isAuth, getCurrentUser);

// Update profile with optional image
userRouter.post(
  "/profile",
  isAuth,
  uploadMiddleware, // ✅ better error handling + logs
  updateProfile
);

export default userRouter;
