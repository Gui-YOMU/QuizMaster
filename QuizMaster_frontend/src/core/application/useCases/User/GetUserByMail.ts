import type { UserRepository } from "../../../domain/ports/UserRepository.ts";

export class GetUserByMail {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(mail: string, password: string): Promise<[string, number]> {
        return this.userRepository.findUserByMail(mail, password);
    }
}