import { User } from "../../../domain/entities/User.ts";
import type { UserRepository } from "../../../domain/ports/UserRepository.ts";

export class GetAllUsers {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<User[]> {
        return this.userRepository.findAllUsers();
    }
}