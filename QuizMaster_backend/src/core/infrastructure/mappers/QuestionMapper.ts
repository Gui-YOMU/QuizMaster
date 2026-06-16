import { Prisma } from "../generated/prisma/index.js";
import { QuestionEty } from "../../domain/entities/QuestionEty.js";

type PrismaQuestion = Prisma.QuestionGetPayload<{
  include: {
    answers: true; items: true; teamToQuestion: true
  };
}>;

export class QuestionMapper {
  static toDomain(prismaQuestion: PrismaQuestion): QuestionEty {
    return new QuestionEty(
      prismaQuestion.id,
      prismaQuestion.type,
      prismaQuestion.subject,
      prismaQuestion.query,
      prismaQuestion.timer,
      prismaQuestion.points,
      prismaQuestion.id_quiz,
      prismaQuestion.answers.map((a) => a.id),
      prismaQuestion.items.map((i) => i.id),
      prismaQuestion.teamToQuestion.map((tTQ) => tTQ.id),
    );
  }
}