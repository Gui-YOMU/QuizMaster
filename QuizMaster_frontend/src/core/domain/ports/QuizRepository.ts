import type { CreateQuizDto } from "../../application/dtos/Quiz/CreateQuizDto";
import type { UpdateQuizDto } from "../../application/dtos/Quiz/UpdateQuizDto";
import type { Quiz } from "../entities/Quiz";

export interface QuizRepository {
  createQuiz(quiz: CreateQuizDto): Promise<Quiz>;

  updateQuiz(id: number, quiz: UpdateQuizDto): Promise<void>;

  deleteQuiz(id: number): Promise<void>;

  findQuizById(id: number): Promise<Quiz | null>;

  findAllQuizByUser(userId: number): Promise<Quiz[]>;
}
