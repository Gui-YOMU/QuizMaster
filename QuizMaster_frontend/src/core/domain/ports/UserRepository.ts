import type { CreateUserDto } from "../../application/dtos/User/CreateUserDto.ts";
import type { UpdateUserDto } from "../../application/dtos/User/UpdateUserDto.ts";
import { User } from "../entities/User.ts";

export interface UserRepository {
  findAllUsers(): Promise<User[]>;

  findUserByMail(mail: string, password: string): Promise<[string, number]>;

  findUserById(id: number): Promise<User | null>;

  createUser(user: CreateUserDto): Promise<void>;

  updateUser(id: number, user: UpdateUserDto): Promise<void>;

  deleteUser(id: number): Promise<void>;
}
