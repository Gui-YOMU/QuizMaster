import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { container } from "../../../config/container";
import type { CreateAnswerDto } from "../../application/dtos/Answer/CreateAnswerDto";

export const AnswerQueries = {
  createAnswers: () =>
    mutationOptions({
      mutationKey: ["answers", "create"],
      mutationFn: (answers: CreateAnswerDto[]) =>
        container.answer.createAnswers.execute(answers),
    }),
  deleteAnswers: () =>
    mutationOptions({
      mutationKey: ["answers", "delete"],
      mutationFn: (questionId: number) =>
        container.answer.deleteAnswers.execute(questionId),
    }),
  findAnswerById: (id: number) =>
    queryOptions({
      queryKey: ["answer", id],
      queryFn: () => container.answer.getAnswerById.execute(id),
    }),
  findAllAnswersByQuestion: (questionId: number) =>
    queryOptions({
      queryKey: ["answersByQuestion", questionId],
      queryFn: () =>
        container.answer.getAllAnswersByQuestion.execute(questionId),
    }),
};
