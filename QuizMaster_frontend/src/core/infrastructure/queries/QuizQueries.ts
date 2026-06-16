import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { CreateQuizDto } from "../../application/dtos/Quiz/CreateQuizDto";
import { container } from "../../../config/container";
import type { UpdateQuizDto } from "../../application/dtos/Quiz/UpdateQuizDto";

export const QuizQueries = {
  createQuiz: () =>
    mutationOptions({
      mutationKey: ["quiz", "create"],
      mutationFn: (quiz: CreateQuizDto) =>
        container.quiz.createQuiz.execute(quiz),
    }),
  updateQuiz: () =>
    mutationOptions({
      mutationKey: ["quiz", "update"],
      mutationFn: ({ id, quiz }: { id: number; quiz: UpdateQuizDto }) =>
        container.quiz.updateQuiz.execute(id, quiz),
    }),
  deleteQuiz: () =>
    mutationOptions({
      mutationKey: ["quiz", "delete"],
      mutationFn: (id: number) => container.quiz.deleteQuiz.execute(id),
    }),
  findQuizById: (id: number) =>
    queryOptions({
      queryKey: ["quiz", id],
      queryFn: () => container.quiz.getQuizById.execute(id),
    }),
  findAllQuizByUser: (userId: number) => 
    queryOptions({
      queryKey: ["quizByUser", userId],
      queryFn: () => container.quiz.getAllQuizByUser.execute(userId),
    })
};
