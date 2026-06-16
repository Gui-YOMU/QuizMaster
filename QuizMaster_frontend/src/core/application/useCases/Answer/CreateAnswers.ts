import type { Answer } from "../../../domain/entities/Answer";
import type { AnswerRepository } from "../../../domain/ports/AnswerRepository";
import type { CreateAnswerDto } from "../../dtos/Answer/CreateAnswerDto";

export class CreateAnswers {
  private readonly answerRepository: AnswerRepository;
    
      constructor(answerRepository: AnswerRepository) {
        this.answerRepository = answerRepository;
      }
    
      async execute(answers: CreateAnswerDto[]): Promise<Answer[]> {
        return this.answerRepository.createAnswers(answers);
      }
}
