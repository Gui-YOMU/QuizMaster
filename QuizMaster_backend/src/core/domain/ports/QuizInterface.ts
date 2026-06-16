import type { CreateQuizDto } from "../../application/dtos/Quiz/CreateQuizDto.js";
import type { UpdateQuizDto } from "../../application/dtos/Quiz/UpdateQuizDto.js";
import { QuizEty } from "../entities/QuizEty.js";

export interface QuizInterface {
  createQuiz(quiz: CreateQuizDto): Promise<QuizEty>;

  updateQuiz(id: number, quiz: UpdateQuizDto): Promise<void>;

  deleteQuiz(id: number): Promise<void>;

  findQuizById(id: number): Promise<QuizEty | null>;

  findAllQuizByUser(userId: number): Promise<QuizEty[]>;
}
