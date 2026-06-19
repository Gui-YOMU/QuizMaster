import { useNavigate, useOutletContext } from "react-router";
import { QuestionQueries } from "../../../../core/infrastructure/queries/QuestionQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { CreateAnswerDto } from "../../../../core/application/dtos/Answer/CreateAnswerDto";
import { AnswerQueries } from "../../../../core/infrastructure/queries/AnswerQueries";
import { AnswerMapper } from "../../../../core/infrastructure/mappers/AnswerMapper";

export function useQuestionParamsPageViewModel() {
  const { selectedQuestionId, quizId } = useOutletContext<{
    selectedQuestionId: number;
    quizId: number;
  }>();

  const queryClient = useQueryClient();

  const [questionSubject, setQuestionSubject] = useState("");
  const [questionQuery, setQuestionQuery] = useState("");
  const [questionTimer, setQuestionTimer] = useState(0);
  const [questionPoints, setQuestionPoints] = useState(0);
  const [questionType, setQuestionType] = useState("");

  const { data: allQuestionAnswers } = useQuery({
    ...AnswerQueries.findAllAnswersByQuestion(selectedQuestionId ?? 0),
    enabled: selectedQuestionId !== null,
  });

  const initialAnswers = allQuestionAnswers?.map((answer) => AnswerMapper.toCreateAnswerDto(answer));

  const [answers, setAnswers] = useState<CreateAnswerDto[]>(initialAnswers ?? []);

  const Navigate = useNavigate();

  const { data: selectedQuestionData } = useQuery({
    ...QuestionQueries.findQuestionById(selectedQuestionId ?? 0),
    enabled: selectedQuestionId !== null,
  });

  useEffect(() => {
    if (selectedQuestionData) {
      setQuestionSubject(selectedQuestionData.subject ?? "");
      setQuestionQuery(selectedQuestionData.query);
      setQuestionTimer(selectedQuestionData.timer);
      setQuestionPoints(selectedQuestionData.points);
      setQuestionType(selectedQuestionData.type ?? "");
    }
  }, [selectedQuestionData]);

  const updateQuestionParamsMutation = QuestionQueries.updateQuestion();

  const updateParamsMutation = useMutation({
    ...updateQuestionParamsMutation,
    onSuccess: () => {
      console.log("Modification des paramètres de la question réussie.");
      toast.success("La modification de la question a été effectuée.");
      queryClient.invalidateQueries({ queryKey: ["question", selectedQuestionId] });
      queryClient.invalidateQueries({ queryKey: ["questionsByQuiz", quizId] })
      Navigate(`/questionView/${selectedQuestionId}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const createAnswersMutation = AnswerQueries.createAnswers();

  const createMutation = useMutation({
    ...createAnswersMutation,
    onSuccess: () => {
      console.log("Création des réponses de la question réussie.");
      toast.success("Les réponses ont été ajoutées à la question.");
      queryClient.invalidateQueries({ queryKey: ["answersByQuestion", selectedQuestionId] })
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const deleteAnswersMutation = AnswerQueries.deleteAnswers();

  const deleteMutation = useMutation({
    ...deleteAnswersMutation,
    onSuccess: () => {
      console.log("Suppression des anciennes réponses réussie.");
      toast.success("Les anciennes réponses ont été supprimées.");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onSubmitQuestionParams = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (initialAnswers && initialAnswers.length > 0) {
      await deleteMutation.mutateAsync(selectedQuestionId ?? 0);
      console.log("Anciennes réponses supprimées.");
    }

    await createMutation.mutateAsync(answers);

    updateParamsMutation.mutate({
      id: selectedQuestionId ?? 0,
      question: {
        subject:
          questionSubject.trim().length !== 0 ? questionSubject : undefined,
        query: questionQuery.trim().length !== 0 ? questionQuery : undefined,
        timer: questionTimer,
        points: questionPoints,
      },
    });
  };

  return {
    selectedQuestionId,
    questionSubject,
    questionQuery,
    questionPoints,
    questionTimer,
    questionType,
    setQuestionSubject,
    setQuestionQuery,
    setQuestionTimer,
    setQuestionPoints,
    onSubmitQuestionParams,
    answers,
    setAnswers,
  };
}
