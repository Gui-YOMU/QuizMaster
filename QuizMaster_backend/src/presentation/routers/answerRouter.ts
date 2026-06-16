import express from "express";
import { authToken } from "../middlewares/authToken.js";
import { createAnswers, deleteAnswers, getAllAnswersByQuestion, getAnswerById } from "../controllers/answerController.js";

export const answerRouter = express.Router();

answerRouter.post("/answers", authToken, createAnswers);

answerRouter.get("/answers/:id", authToken, getAnswerById);
answerRouter.get("/answers/question/:questionId", authToken, getAllAnswersByQuestion);

answerRouter.delete("/answers/question/:questionId", authToken, deleteAnswers);