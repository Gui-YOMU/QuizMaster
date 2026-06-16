import { CreateUserDto } from "../../application/dtos/User/CreateUserDto.js";
import { UpdateUserDto } from "../../application/dtos/User/UpdateUserDto.js";
import { UserEty } from "../entities/UserEty.js";

export interface UserInterface {
  findAllUsers(): Promise<UserEty[]>;

  findUserByMail(mail: string, password?: string): Promise<UserEty | null>;

  findUserById(id: number): Promise<UserEty | null>;

  findUserBySurname(surname: string): Promise<UserEty | null>;

  createUser(user: CreateUserDto): Promise<void>;

  updateUser(id: number, user: UpdateUserDto): Promise<void>;

  deleteUser(id: number): Promise<void>;
}
