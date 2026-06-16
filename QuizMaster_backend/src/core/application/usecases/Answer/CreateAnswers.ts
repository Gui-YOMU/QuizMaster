import { AnswerEty } from "../../../domain/entities/AnswerEty.js";
import { AnswerInterface } from "../../../domain/ports/AnswerInterface.js";
import type { CreateAnswerDto } from "../../dtos/Answer/CreateAnswerDto.js";

export class CreateAnswers {
  private answerInterface: AnswerInterface;

  constructor(answerInterface: AnswerInterface) {
    this.answerInterface = answerInterface;
  }

  async execute(answers: CreateAnswerDto[]): Promise<AnswerEty[]> {
    const data = this.answerInterface.createAnswers(answers);
    return data;
  }
}