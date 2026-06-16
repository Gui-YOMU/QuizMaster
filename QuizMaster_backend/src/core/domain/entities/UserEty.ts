import { RoleValueObject } from "../valueobjects/RoleValueObject.js";

export class UserEty {
  constructor(
    public readonly id: number,
    public lastName: string,
    public firstName: string,
    public surname: string | null,
    public mail: string,
    public password: string,
    public readonly quizIds: number[],
    public readonly roomIds: number[],
    public readonly teamIds: number[],
    public role: RoleValueObject = RoleValueObject.player,
  ) {}
}
