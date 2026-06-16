import type { Answer } from "../../../domain/entities/Answer";
import type { AnswerRepository } from "../../../domain/ports/AnswerRepository";

export class GetAnswerById {
    private readonly answerRepository: AnswerRepository;
        
          constructor(answerRepository: AnswerRepository) {
            this.answerRepository = answerRepository;
          }

    async execute(id: number): Promise<Answer | null> {
        return this.answerRepository.findAnswerById(id);
    }
}