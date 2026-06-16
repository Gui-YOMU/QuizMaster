import { AppError } from "../../../domain/errors/AppError.js";
import { QuizInterface } from "../../../domain/ports/QuizInterface.js";
import type { UpdateQuizDto } from "../../dtos/Quiz/UpdateQuizDto.js";

export class UpdateQuiz {
  private quizInterface: QuizInterface;

  constructor(quizInterface: QuizInterface) {
    this.quizInterface = quizInterface;
  }

  async execute(id: number, quiz: UpdateQuizDto): Promise<void> {
    const existingQuiz = await this.quizInterface.findQuizById(id);
        if (!existingQuiz) {
          throw new AppError({
            statusCode: 404,
            message: "Ce quiz n'existe pas.",
          });
        }
        await this.quizInterface.updateQuiz(id, {
          quizName: quiz.quizName ?? quiz.quizName,
          description: quiz.description ?? quiz.description,
        });
  }
}
