import type { Quiz } from "../../../domain/entities/Quiz";
import type { QuizRepository } from "../../../domain/ports/QuizRepository";

export class GetAllQuizByUser {
    private readonly quizRepository: QuizRepository;

    constructor(quizRepository: QuizRepository) {
        this.quizRepository = quizRepository;
    }

    async execute(userId: number): Promise<Quiz[]> {
        return this.quizRepository.findAllQuizByUser(userId);
    }
}