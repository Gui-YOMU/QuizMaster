import { AppError } from "../../../domain/errors/AppError.js";
import { QuizInterface } from "../../../domain/ports/QuizInterface.js";

export class GetQuizById {
  private quizInterface: QuizInterface;
  
    constructor(quizInterface: QuizInterface) {
      this.quizInterface = quizInterface;
    }

  async execute(id: number) {
    const quiz = await this.quizInterface.findQuizById(id);
    if (quiz) {
      return quiz;
      } else {
      throw new AppError({statusCode: 404, message: "Le quiz n'existe pas."})
    }
  }
}