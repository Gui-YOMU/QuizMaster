import type { QuestionRepository } from "../../../domain/ports/QuestionRepository";

export class DeleteQuestion {
  private readonly questionRepository: QuestionRepository;

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async execute(id: number): Promise<void> {
    return this.questionRepository.deleteQuestion(id);
  }
}
