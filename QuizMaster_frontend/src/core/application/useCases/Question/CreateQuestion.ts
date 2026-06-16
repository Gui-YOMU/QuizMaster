import type { Question } from "../../../domain/entities/Question";
import type { QuestionRepository } from "../../../domain/ports/QuestionRepository";
import type { CreateQuestionDto } from "../../dtos/Question/CreateQuestionDto";

export class CreateQuestion {
  private readonly questionRepository: QuestionRepository;
    
      constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository;
      }
    
      async execute(question: CreateQuestionDto): Promise<Question> {
        return this.questionRepository.createQuestion(question);
      }
}
