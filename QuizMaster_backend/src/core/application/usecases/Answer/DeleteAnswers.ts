import { AppError } from "../../../domain/errors/AppError.js";
import { AnswerInterface } from "../../../domain/ports/AnswerInterface.js";

export class DeleteAnswers {
  private answerInterface: AnswerInterface;

  constructor(answerInterface: AnswerInterface) {
    this.answerInterface = answerInterface;
  }

  async execute(questionId: number): Promise<void> {
    const answers = await this.answerInterface.findAllAnswersByQuestion(questionId);
        if (answers) {
          await this.answerInterface.deleteAnswers(questionId);
        } else {
          throw new AppError({
            statusCode: 404,
            message: "Aucune réponse trouvée pour cette question.",
          });
        }
  }
}
