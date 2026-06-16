import type { UserRepository } from "../../../domain/ports/UserRepository.ts";
import type { CreateUserDto } from "../../dtos/User/CreateUserDto.ts";

export class CreateUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(user);
  }
}
