import { AnswerInterface } from "../../../domain/ports/AnswerInterface.js";

export class GetAllAnswersByQuestion {
  private answerInterface: AnswerInterface;
    
      constructor(answerInterface: AnswerInterface) {
        this.answerInterface = answerInterface;
      }

  async execute(questionId: number) {
    const answersList = await this.answerInterface.findAllAnswersByQuestion(questionId);
    return answersList;
  }
}