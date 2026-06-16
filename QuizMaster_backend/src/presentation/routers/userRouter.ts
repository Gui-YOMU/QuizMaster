import express from "express";
import {
  createUser,
  deleteUser,
  getDashboard,
  logUser,
  updateUser,
} from "../controllers/userController.js";
import { authToken } from "../middlewares/authToken.js";

export const userRouter = express.Router();

userRouter.post("/users", createUser);
userRouter.post("/users/login", logUser);

userRouter.get("/users/:id", authToken, getDashboard);
userRouter.put("/users/:id", authToken, updateUser);
userRouter.delete("/users/:id", authToken, deleteUser);
