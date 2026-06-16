import type { CreateQuestionDto } from "../../application/dtos/Question/CreateQuestionDto.js";
import type { UpdateQuestionDto } from "../../application/dtos/Question/UpdateQuestionDto.js";
import { QuestionEty } from "../entities/QuestionEty.js";

export interface QuestionInterface {
  createQuestion(question: CreateQuestionDto): Promise<QuestionEty>;

  updateQuestion(id: number, question: UpdateQuestionDto): Promise<void>;

  deleteQuestion(id: number): Promise<void>;

  findAllQuestionsByQuiz(quizId: number): Promise<QuestionEty[]>;

  findQuestionById(id: number): Promise<QuestionEty | null>;
}
