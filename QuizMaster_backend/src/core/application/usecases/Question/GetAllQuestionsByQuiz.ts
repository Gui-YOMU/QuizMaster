import { QuestionInterface } from "../../../domain/ports/QuestionInterface.js";

export class GetAllQuestionsByQuiz {
  private questionInterface: QuestionInterface;
  
    constructor(questionInterface: QuestionInterface) {
      this.questionInterface = questionInterface;
    }

  async execute(quizId: number) {
    const questionsList = await this.questionInterface.findAllQuestionsByQuiz(quizId);
    return questionsList;
  }
}
