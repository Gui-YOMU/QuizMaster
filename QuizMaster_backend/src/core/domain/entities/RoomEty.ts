export class RoomEty {
  constructor(
    public readonly id: number,
    public roomName: string,
    public roomCode: string,
    public id_user: number,
    public id_quiz: number,
    public readonly teamIds: number[],
    public readonly teamToQuestionIds: number[],
  ) {}
}
