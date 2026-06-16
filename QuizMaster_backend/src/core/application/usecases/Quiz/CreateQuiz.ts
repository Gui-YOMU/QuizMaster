import { QuizEty } from "../../../domain/entities/QuizEty.js";
import { QuizInterface } from "../../../domain/ports/QuizInterface.js";
import type { CreateQuizDto } from "../../dtos/Quiz/CreateQuizDto.js";

export class CreateQuiz {
  private quizInterface: QuizInterface;

  constructor(quizInterface: QuizInterface) {
    this.quizInterface = quizInterface;
  }

  async execute(quiz: CreateQuizDto): Promise<QuizEty> {
    const data = await this.quizInterface.createQuiz(quiz);
    return data;
  }
}
