import type { AnswerRepository } from "../../../domain/ports/AnswerRepository";

export class DeleteAnswers {
  private readonly answerRepository: AnswerRepository;

  constructor(answerRepository: AnswerRepository) {
    this.answerRepository = answerRepository;
  }

  async execute(questionId: number): Promise<void> {
    return this.answerRepository.deleteAnswers(questionId);
  }
}
