import { AppError } from "../../../domain/errors/AppError.js";
import { QuestionInterface } from "../../../domain/ports/QuestionInterface.js";
import type { UpdateQuestionDto } from "../../dtos/Question/UpdateQuestionDto.js";

export class UpdateQuestion {
  private questionInterface: QuestionInterface;

  constructor(questionInterface: QuestionInterface) {
    this.questionInterface = questionInterface;
  }

  async execute(id: number, question: UpdateQuestionDto): Promise<void> {
    const existingQuestion = await this.questionInterface.findQuestionById(id);
    if (!existingQuestion) {
      throw new AppError({
        statusCode: 404,
        message: "Cette question n'existe pas.",
      });
    }
    if (question.timer && question.timer < 0) {
      throw new AppError({
        statusCode: 403,
        message: "Le timer ne peut pas être un nombre négatif."
      })
    }
    if (question.points && question.points < 0 ) {
      throw new AppError({
        statusCode: 403,
        message: "Le score ne peut pas être un nombre négatif."
      })
    }
    await this.questionInterface.updateQuestion(id, {
      type: question.type ?? question.type,
      subject: question.subject ?? question.subject,
      query: question.query ?? question.query,
      timer: question.timer ?? question.timer,
      points: question.points ?? question.points,
    });
  }
}
