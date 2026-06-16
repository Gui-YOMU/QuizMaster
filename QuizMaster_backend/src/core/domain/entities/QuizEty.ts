export class QuizEty {
  constructor(
    public readonly id: number,
    public quizName: string,
    public description: string | null,
    public id_user: number,
    public readonly questionIds: number[],
    public readonly roomIds: number[],
  ) {}
}
