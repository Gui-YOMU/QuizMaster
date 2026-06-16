import type { CreateAnswerDto } from "../../application/dtos/Answer/CreateAnswerDto.js";
import { AnswerEty } from "../entities/AnswerEty.js";

export interface AnswerInterface {
  createAnswers(answers: CreateAnswerDto[]): Promise<AnswerEty[]>;

  deleteAnswers(questionId: number): Promise<void>;

  findAllAnswersByQuestion(questionId: number): Promise<AnswerEty[]>;

  findAnswerById(id: number): Promise<AnswerEty | null>;
}
