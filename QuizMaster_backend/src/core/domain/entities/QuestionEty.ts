export class QuestionEty {
  constructor(
    public readonly id: number,
    public type: string | null,
    public subject: string | null,
    public query: string,
    public timer: number,
    public points: number,
    public id_quiz: number,
    public readonly answerIds: number[],
    public readonly itemIds: number[],
    public readonly teamToQuestionIds: number[],
  ) {}
}
