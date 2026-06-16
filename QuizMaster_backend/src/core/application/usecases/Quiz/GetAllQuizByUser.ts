import { AppError } from "../../../domain/errors/AppError.js";
import { QuizInterface } from "../../../domain/ports/QuizInterface.js";

export class GetAllQuizByUser {
  private quizInterface: QuizInterface;

  constructor(quizInterface: QuizInterface) {
    this.quizInterface = quizInterface;
  }

  async execute(userId: number) {
    const quizList = await this.quizInterface.findAllQuizByUser(userId);
    return quizList;
  }
}
