import { AppError } from "../../../domain/errors/AppError.js";
import { AnswerInterface } from "../../../domain/ports/AnswerInterface.js";
import { QuestionInterface } from "../../../domain/ports/QuestionInterface.js";

export class GetAnswerById {
  private answerInterface: AnswerInterface;
  
    constructor(answerInterface: AnswerInterface) {
      this.answerInterface = answerInterface;
    }

  async execute(id: number) {
    const answer = await this.answerInterface.findAnswerById(id);
    if (answer) {
      return answer;
      } else {
      throw new AppError({statusCode: 404, message: "La réponse n'existe pas."})
    }
  }
}