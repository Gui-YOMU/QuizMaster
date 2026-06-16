import type { QuizRepository } from "../../../domain/ports/QuizRepository";

export class DeleteQuiz {
  private readonly quizRepository: QuizRepository;

  constructor(quizRepository: QuizRepository) {
    this.quizRepository = quizRepository;
  }

  async execute(id: number): Promise<void> {
    return this.quizRepository.deleteQuiz(id);
  }
}
