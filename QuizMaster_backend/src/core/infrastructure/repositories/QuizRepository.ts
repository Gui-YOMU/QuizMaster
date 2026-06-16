import { CreateQuizDto } from "../../application/dtos/Quiz/CreateQuizDto.js";
import { UpdateQuizDto } from "../../application/dtos/Quiz/UpdateQuizDto.js";
import { QuizEty } from "../../domain/entities/QuizEty.js";
import { QuizInterface } from "../../domain/ports/QuizInterface.js";
import { prisma } from "../database/prisma.js";
import { QuizMapper } from "../mappers/QuizMapper.js";
import escape from "escape-html";

export class QuizRepository implements QuizInterface {
  async findAllQuizByUser(userId: number): Promise<QuizEty[]> {
    const quizList = await prisma.quiz.findMany({
      where: { id_user: userId },
      include: { questions: true, rooms: true },
    });
    return quizList.length > 0
      ? quizList.map((quiz) => QuizMapper.toDomain(quiz))
      : [];
  }

  async findQuizById(id: number): Promise<QuizEty | null> {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: { questions: true, rooms: true },
    });
    return quiz ? QuizMapper.toDomain(quiz) : null;
  }

  async createQuiz(quiz: CreateQuizDto): Promise<QuizEty> {
    try {
      const newQuiz = await prisma.quiz.create({
        data: {
          quizName: escape(quiz.quizName),
          description: quiz.description ? escape(quiz.description) : null,
          id_user: quiz.id_user,
        },
        include: {
          questions: true,
          rooms: true,
        },
      });
      return QuizMapper.toDomain(newQuiz);
    } catch (error) {
      throw error;
    }
  }

  async updateQuiz(id: number, quiz: UpdateQuizDto): Promise<void> {
    try {
      await prisma.quiz.update({
        where: { id },
        data: {
          quizName: escape(quiz.quizName),
          description: escape(quiz.description),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteQuiz(id: number): Promise<void> {
    try {
      await prisma.quiz.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
