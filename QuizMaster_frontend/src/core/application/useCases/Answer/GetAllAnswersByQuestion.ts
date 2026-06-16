import type { Answer } from "../../../domain/entities/Answer";
import type { AnswerRepository } from "../../../domain/ports/AnswerRepository";

export class GetAllAnswersByQuestion {
    private readonly answerRepository: AnswerRepository;
    
      constructor(answerRepository: AnswerRepository) {
        this.answerRepository = answerRepository;
      }

    async execute(questionId: number): Promise<Answer[]> {
        return this.answerRepository.findAllAnswersByQuestion(questionId);
    }
}