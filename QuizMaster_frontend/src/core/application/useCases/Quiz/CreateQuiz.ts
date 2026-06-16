import type { Quiz } from "../../../domain/entities/Quiz";
import type { QuizRepository } from "../../../domain/ports/QuizRepository";
import type { CreateQuizDto } from "../../dtos/Quiz/CreateQuizDto";

export class CreateQuiz {
  private readonly quizRepository: QuizRepository;
  
    constructor(quizRepository: QuizRepository) {
      this.quizRepository = quizRepository;
    }
  
    async execute(quiz: CreateQuizDto): Promise<Quiz> {
      return this.quizRepository.createQuiz(quiz);
    }
}
