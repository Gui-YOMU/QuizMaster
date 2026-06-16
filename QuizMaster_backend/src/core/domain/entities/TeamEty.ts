export class TeamEty {
  constructor(
    public readonly id: number,
    public teamName: string,
    public teamScore: number | null = 0,
    public teamRank: number | null,
    public teamBadAnswers: number | null = 0,
    public id_room: number,
    public readonly teamToQuestionIds: number[],
    public readonly userIds: number[],
  ) {}
}
