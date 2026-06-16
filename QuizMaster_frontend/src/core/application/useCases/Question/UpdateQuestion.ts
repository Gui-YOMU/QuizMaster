import type { QuestionRepository } from "../../../domain/ports/QuestionRepository";
import type { UpdateQuestionDto } from "../../dtos/Question/UpdateQuestionDto";

export class UpdateQuestion {
  private readonly questionRepository: QuestionRepository;

  constructor(questionRepository: QuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async execute(id: number, question: UpdateQuestionDto): Promise<void> {
    return this.questionRepository.updateQuestion(id, question);
  }
}
