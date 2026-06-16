import { RoleValueObject } from "../../../domain/valueobjects/RoleValueObject.js";

export interface ClientUserDto {
  id: number;
  lastName: string;
  firstName: string;
  surname: string | null;
  mail: string;
  role: RoleValueObject;
  quizIds: number[];
  roomIds: number[];
  teamIds: number[];
}
