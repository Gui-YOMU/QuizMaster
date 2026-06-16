import { CreateAnswerDto } from "../../application/dtos/Answer/CreateAnswerDto.js";
import { AnswerEty } from "../../domain/entities/AnswerEty.js";
import { AnswerInterface } from "../../domain/ports/AnswerInterface.js";
import { prisma } from "../database/prisma.js";
import { AnswerMapper } from "../mappers/AnswerMapper.js";
import escape from "escape-html";

export class AnswerRepository implements AnswerInterface {
  async findAllAnswersByQuestion(questionId: number): Promise<AnswerEty[]> {
    const answersList = await prisma.answer.findMany({
          where: { id_question: questionId },
        });
        return answersList.length > 0
          ? answersList.map((answer) => AnswerMapper.toDomain(answer))
          : [];
  }

  async findAnswerById(id: number): Promise<AnswerEty | null> {
    const answer = await prisma.answer.findUnique({
      where: { id },
    });
    return answer ? AnswerMapper.toDomain(answer) : null;
  }

  async createAnswers(answers: CreateAnswerDto[]): Promise<AnswerEty[]> {
    try {
      const validAnswers = answers.filter((answer) => !!answer.value)
      const newAnswers = await Promise.all(
        validAnswers.map((answer) =>
          prisma.answer.create({
            data: {
              letter: answer.letter ? escape(answer.letter) : null,
              value: escape(answer.value!),
              isGoodAnswer: answer.isGoodAnswer,
              id_question: answer.id_question,
            },
          }),
        ),
      );
      return newAnswers.map((newAnswer) => AnswerMapper.toDomain(newAnswer));
    } catch (error) {
      throw error;
    }
  }

  async deleteAnswers(questionId: number): Promise<void> {
    try {
      await prisma.answer.deleteMany({ where: { id_question: questionId } });
    } catch (error) {
      throw error;
    }
  }
}
