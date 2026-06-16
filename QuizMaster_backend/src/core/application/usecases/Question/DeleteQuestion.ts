import { AppError } from "../../../domain/errors/AppError.js";
import { QuestionInterface } from "../../../domain/ports/QuestionInterface.js";

export class DeleteQuestion {
  private questionInterface: QuestionInterface;

  constructor(questionInterface: QuestionInterface) {
    this.questionInterface = questionInterface;
  }

  async execute(id: number): Promise<void> {
    const question = await this.questionInterface.findQuestionById(id);
    if (question) {
      await this.questionInterface.deleteQuestion(id);
    } else {
      throw new AppError({
        statusCode: 404,
        message: "La question n'existe pas.",
      });
    }
  }
}
