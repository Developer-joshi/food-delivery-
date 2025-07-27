import express from "express";
import {
  loginUser,
  registerUser,
  getAllUsers, // ✅ add this
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// ✅ New route to fetch all users
userRouter.get("/all", getAllUsers);

export default userRouter;
