import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import { QuestionQueries } from "../../../../core/infrastructure/queries/QuestionQueries";
import { AnswerQueries } from "../../../../core/infrastructure/queries/AnswerQueries";
import { useEffect, useState } from "react";
import type { Answer } from "../../../../core/domain/entities/Answer";

export function useQuestionViewPageViewModel() {
  const { selectedQuestionId } = useOutletContext<{
    selectedQuestionId: number;
  }>();

  const [questionSubject, setQuestionSubject] = useState("");
  const [questionQuery, setQuestionQuery] = useState("");
  const [questionTimer, setQuestionTimer] = useState(0);
  const [questionPoints, setQuestionPoints] = useState(0);
  const [questionType, setQuestionType] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);

  const { data: selectedQuestionData } = useQuery({
    ...QuestionQueries.findQuestionById(selectedQuestionId ?? 0),
    enabled: selectedQuestionId !== null,
  });

  const { data: allQuestionAnswers } = useQuery({
    ...AnswerQueries.findAllAnswersByQuestion(selectedQuestionId ?? 0),
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
    if (allQuestionAnswers) {
      setAnswers(allQuestionAnswers);
    }
  }, [selectedQuestionData, allQuestionAnswers]);

  return {
    questionId: selectedQuestionId,
    questionSubject,
    questionQuery,
    questionPoints,
    questionTimer,
    questionType,
    answers,
  };
}
