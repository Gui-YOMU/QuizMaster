import type { CreateAnswerDto } from "../../application/dtos/Answer/CreateAnswerDto";
import type { Answer } from "../entities/Answer";

export interface AnswerRepository {
  createAnswers(answer: CreateAnswerDto[]): Promise<Answer[]>;

  deleteAnswers(questionId: number): Promise<void>;

  findAllAnswersByQuestion(questionId: number): Promise<Answer[]>;

  findAnswerById(id: number): Promise<Answer | null>;
}
