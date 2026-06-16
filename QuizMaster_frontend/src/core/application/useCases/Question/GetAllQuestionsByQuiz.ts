import type { Question } from "../../../domain/entities/Question";
import type { QuestionRepository } from "../../../domain/ports/QuestionRepository";

export class GetAllQuestionsByQuiz {
    private readonly questionRepository: QuestionRepository;
        
          constructor(questionRepository: QuestionRepository) {
            this.questionRepository = questionRepository;
          }

    async execute(quizId: number): Promise<Question[]> {
        return this.questionRepository.findAllQuestionsByQuiz(quizId);
    }
}