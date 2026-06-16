import { AppError } from "../../../domain/errors/AppError.js";
import { QuizInterface } from "../../../domain/ports/QuizInterface.js";

export class DeleteQuiz {
  private quizInterface: QuizInterface;

  constructor(quizInterface: QuizInterface) {
    this.quizInterface = quizInterface;
  }

  async execute(id: number): Promise<void> {
    const quiz = await this.quizInterface.findQuizById(id);
        if (quiz) {
          await this.quizInterface.deleteQuiz(id);
          } else {
          throw new AppError({statusCode: 404, message: "Le quiz n'existe pas."})
        }
  }
}
