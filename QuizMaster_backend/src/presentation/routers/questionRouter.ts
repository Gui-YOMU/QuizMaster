import express from "express";
import { authToken } from "../middlewares/authToken.js";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestionsByQuiz,
  getQuestionById,
  updateQuestion,
} from "../controllers/questionController.js";

export const questionRouter = express.Router();

questionRouter.post("/questions", authToken, createQuestion);

questionRouter.get("/questions/quiz/:quizId", authToken, getAllQuestionsByQuiz);
questionRouter.get("/questions/:id", authToken, getQuestionById);

questionRouter.patch("/questions/:id", authToken, updateQuestion);
questionRouter.delete("/questions/:id", authToken, deleteQuestion);
