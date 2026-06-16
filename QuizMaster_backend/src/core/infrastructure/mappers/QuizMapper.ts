import { Prisma } from "../generated/prisma/index.js";
import { QuizEty } from "../../domain/entities/QuizEty.js";

type PrismaQuiz = Prisma.QuizGetPayload<{
  include: {
    questions: true;
    rooms: true;
  };
}>;

export class QuizMapper {
  static toDomain(prismaQuiz: PrismaQuiz): QuizEty {
    return new QuizEty(
      prismaQuiz.id,
      prismaQuiz.quizName,
      prismaQuiz.description,
      prismaQuiz.id_user,
      prismaQuiz.questions.map((q) => q.id),
      prismaQuiz.rooms.map((r) => r.id),
    );
  }
}
