import type { CreateAnswerDto } from "../../application/dtos/Answer/CreateAnswerDto";
import type { Answer } from "../../domain/entities/Answer";

export class AnswerMapper {
    static toCreateAnswerDto(answer: Answer): CreateAnswerDto {
        return {
            letter: answer.letter ?? undefined,
            value: answer.value,
            isGoodAnswer: answer.isGoodAnswer,
            id_question: answer.id_question,
        }
    }
}