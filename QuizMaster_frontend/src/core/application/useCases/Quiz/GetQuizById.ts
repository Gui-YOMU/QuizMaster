import type { Quiz } from "../../../domain/entities/Quiz";
import type { QuizRepository } from "../../../domain/ports/QuizRepository";

export class GetQuizById {
    private readonly quizRepository: QuizRepository;

    constructor(quizRepository: QuizRepository) {
        this.quizRepository = quizRepository;
    }

    async execute(id: number): Promise<Quiz | null> {
        return this.quizRepository.findQuizById(id);
    }
}