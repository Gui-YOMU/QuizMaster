import type { CreateQuestionDto } from "../../application/dtos/Question/CreateQuestionDto";
import type { UpdateQuestionDto } from "../../application/dtos/Question/UpdateQuestionDto";
import type { Question } from "../entities/Question";

export interface QuestionRepository {
  createQuestion(question: CreateQuestionDto): Promise<Question>;

  updateQuestion(id: number, question: UpdateQuestionDto): Promise<void>;

  deleteQuestion(id: number): Promise<void>;

  findAllQuestionsByQuiz(quizId: number): Promise<Question[]>;

  findQuestionById(id: number): Promise<Question | null>;
}
