import { User } from "../../../domain/entities/User.ts";
import type { UserRepository } from "../../../domain/ports/UserRepository.ts";

export class GetUserById {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: number): Promise<User | null> {
        return this.userRepository.findUserById(id);
    }
}