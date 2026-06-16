import type { Question } from "../../../domain/entities/Question";
import type { QuestionRepository } from "../../../domain/ports/QuestionRepository";

export class GetQuestionById {
    private readonly questionRepository: QuestionRepository;
        
          constructor(questionRepository: QuestionRepository) {
            this.questionRepository = questionRepository;
          }

    async execute(id: number): Promise<Question | null> {
        return this.questionRepository.findQuestionById(id);
    }
}