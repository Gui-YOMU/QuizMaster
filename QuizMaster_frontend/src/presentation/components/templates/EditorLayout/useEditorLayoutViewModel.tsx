import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEditor } from "../../../contexts/EditorContext";
import { useEffect } from "react";
import { QuestionQueries } from "../../../../core/infrastructure/queries/QuestionQueries";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export function useEditorLayoutViewModel() {
  const { quizId } = useEditor();

  const Navigate = useNavigate();

  const queryClient = useQueryClient();

  const {questionId} = useParams<{ questionId: string }>();
  const selectedQuestionId = questionId ? parseInt(questionId) : 0;

  const onSelectQuestionId = (questionId: number) => {
    Navigate(`/questionView/${questionId}`);
    console.log(`Question n°${questionId} cliquée`);
  };

  const {
    isPending,
    isError,
    data: questionsList,
    error,
  } = useQuery({
    ...QuestionQueries.findAllQuestionsByQuiz(quizId ? parseInt(quizId) : 0),
    enabled: quizId !== null,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const deleteQuestionMutation = QuestionQueries.deleteQuestion();

  const deleteMutation = useMutation({
    ...deleteQuestionMutation,
    onSuccess: () => {
      console.log("Question supprimée !");
      toast.success("La question a bien été supprimée.");
      queryClient.invalidateQueries({
        queryKey: ["questionsByQuiz", quizId ? parseInt(quizId) : 0],
      });
      Navigate(`/quizMain/${quizId}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onDelete = (questionId: number) => {
    deleteMutation.mutate(questionId);
    console.log("Question supprimée.");
  };

  return {
    isPending,
    isError,
    error,
    questionsList,
    onSelectQuestionId,
    selectedQuestionId,
    onDelete,
    quizId,
  };
}
