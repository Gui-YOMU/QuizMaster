import express from "express";
import { authToken } from "../middlewares/authToken.js";
import { createQuiz, deleteQuiz, getAllQuizByUser, getQuizById, updateQuiz } from "../controllers/quizController.js";

export const quizRouter = express.Router();

quizRouter.post("/quiz", authToken, createQuiz);

quizRouter.get("/quiz/:id", authToken, getQuizById);
quizRouter.get("/quiz/user/:userId", authToken, getAllQuizByUser);

quizRouter.put("/quiz/:id", authToken, updateQuiz);
quizRouter.delete("/quiz/:id", authToken, deleteQuiz);