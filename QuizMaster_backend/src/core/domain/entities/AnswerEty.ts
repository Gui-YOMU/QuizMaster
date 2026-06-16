export class AnswerEty {
  constructor(
    public readonly id: number,
    public letter: string | null,
    public value: string,
    public isGoodAnswer: boolean,
    public id_question: number,
  ) {}
}
