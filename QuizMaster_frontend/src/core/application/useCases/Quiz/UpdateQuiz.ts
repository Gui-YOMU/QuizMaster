import type { QuizRepository } from "../../../domain/ports/QuizRepository";
import type { UpdateQuizDto } from "../../dtos/Quiz/UpdateQuizDto";

export class UpdateQuiz {
  private readonly quizRepository: QuizRepository;

  constructor(quizRepository: QuizRepository) {
    this.quizRepository = quizRepository;
  }

  async execute(id: number, quiz: UpdateQuizDto): Promise<void> {
    return this.quizRepository.updateQuiz(id, quiz);
  }
}
