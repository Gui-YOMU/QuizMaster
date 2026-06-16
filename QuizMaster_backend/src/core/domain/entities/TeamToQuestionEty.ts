export class TeamToQuestionEty {
  constructor(
    public readonly id: number,
    public teamAnswer: string | null,
    public result: boolean | null,
    public id_room: number,
    public id_team: number,
    public id_question: number,
  ) {}
}
