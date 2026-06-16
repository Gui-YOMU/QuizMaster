import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { container } from "../../../config/container";
import type { CreateQuestionDto } from "../../application/dtos/Question/CreateQuestionDto";
import type { UpdateQuestionDto } from "../../application/dtos/Question/UpdateQuestionDto";

export const QuestionQueries = {
  createQuestion: () =>
    mutationOptions({
      mutationKey: ["questions", "create"],
      mutationFn: (question: CreateQuestionDto) =>
        container.question.createQuestion.execute(question),
    }),
  updateQuestion: () =>
    mutationOptions({
      mutationKey: ["questions", "update"],
      mutationFn: ({
        id,
        question,
      }: {
        id: number;
        question: UpdateQuestionDto;
      }) => container.question.updateQuestion.execute(id, question),
    }),
  deleteQuestion: () =>
    mutationOptions({
      mutationKey: ["questions", "delete"],
      mutationFn: (id: number) => container.question.deleteQuestion.execute(id),
    }),
  findQuestionById: (id: number) =>
    queryOptions({
      queryKey: ["question", id],
      queryFn: () => container.question.getQuestionById.execute(id),
    }),
  findAllQuestionsByQuiz: (quizId: number) =>
    queryOptions({
      queryKey: ["questionsByQuiz", quizId],
      queryFn: () => container.question.getAllQuestionsByQuiz.execute(quizId),
    }),
};
