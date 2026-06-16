import { QuestionEty } from "../../../domain/entities/QuestionEty.js";
import { QuestionInterface } from "../../../domain/ports/QuestionInterface.js";
import type { CreateQuestionDto } from "../../dtos/Question/CreateQuestionDto.js";

export class CreateQuestion {
  private questionInterface: QuestionInterface;

  constructor(questionInterface: QuestionInterface) {
    this.questionInterface = questionInterface;
  }

  async execute(question: CreateQuestionDto): Promise<QuestionEty> {
    const data = await this.questionInterface.createQuestion(question);
    return data;
  }
}
