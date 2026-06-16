import type { UserRepository } from "../../../domain/ports/UserRepository.ts";

export class DeleteUser {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: number): Promise<void> {
        return this.userRepository.deleteUser(id);
    }
}