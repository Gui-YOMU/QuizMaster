import { CreateQuestionDto } from "../../application/dtos/Question/CreateQuestionDto.js";
import { UpdateQuestionDto } from "../../application/dtos/Question/UpdateQuestionDto.js";
import { QuestionEty } from "../../domain/entities/QuestionEty.js";
import { QuestionInterface } from "../../domain/ports/QuestionInterface.js";
import { prisma } from "../database/prisma.js";
import { QuestionMapper } from "../mappers/QuestionMapper.js";
import escape from "escape-html";

export class QuestionRepository implements QuestionInterface {
  async findAllQuestionsByQuiz(quizId: number): Promise<QuestionEty[]> {
    const questionsList = await prisma.question.findMany({
      where: { id_quiz: quizId },
      include: { answers: true, items: true, teamToQuestion: true },
    });
    return questionsList.length > 0
      ? questionsList.map((question) => QuestionMapper.toDomain(question))
      : [];
  }

  async findQuestionById(id: number): Promise<QuestionEty | null> {
    const question = await prisma.question.findUnique({
      where: { id },
      include: { answers: true, items: true, teamToQuestion: true },
    });
    return question ? QuestionMapper.toDomain(question) : null;
  }

  async createQuestion(question: CreateQuestionDto): Promise<QuestionEty> {
    try {
      const newQuestion = await prisma.question.create({
        data: {
          id_quiz: question.id_quiz,
        },
        include: {
          answers: true,
          items: true,
          teamToQuestion: true,
        },
      });
      return QuestionMapper.toDomain(newQuestion);
    } catch (error) {
      throw error;
    }
  }

  async updateQuestion(id: number, question: UpdateQuestionDto): Promise<void> {
    try {
      await prisma.question.update({
        where: { id },
        data: {
          type: question.type,
          subject: question.subject ? escape(question.subject) : undefined,
          query: question.query ? escape(question.query) : undefined,
          timer: question.timer,
          points: question.points,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteQuestion(id: number): Promise<void> {
    try {
      await prisma.question.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
