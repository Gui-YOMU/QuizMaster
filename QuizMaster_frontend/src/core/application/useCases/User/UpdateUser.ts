import type { UserRepository } from "../../../domain/ports/UserRepository.ts";
import type { UpdateUserDto } from "../../dtos/User/UpdateUserDto.ts";

export class UpdateUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number, user: UpdateUserDto): Promise<void> {
    return this.userRepository.updateUser(id, user);
  }
}
