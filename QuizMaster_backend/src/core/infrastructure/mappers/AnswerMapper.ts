import { AnswerEty } from "../../domain/entities/AnswerEty.js";
import { Answer } from "../generated/prisma/index.js";

export class AnswerMapper {
  static toDomain(prismaAnswer: Answer): AnswerEty {
    return new AnswerEty(
      prismaAnswer.id,
      prismaAnswer.letter,
      prismaAnswer.value,
      prismaAnswer.isGoodAnswer,
      prismaAnswer.id_question,
    );
  }
}
