import { useNavigate, useOutletContext } from "react-router";
import { QuestionQueries } from "../../../../core/infrastructure/queries/QuestionQueries";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { QUESTION_TYPES } from "../../../../config/questionTypes";

export function useQuestionTypePageViewModel() {
    const typesList = QUESTION_TYPES;

    const { selectedQuestionId } = useOutletContext<{ selectedQuestionId: number }>();

    const Navigate = useNavigate();

    const updateQuestionTypeMutation = QuestionQueries.updateQuestion();

    const updateTypeMutation = useMutation({
    ...updateQuestionTypeMutation,
    onSuccess: () => {
      console.log("Modification du type de la question réussie.");
      toast.success("La modification du type a été effectuée.");
      Navigate(`/questionParams/${selectedQuestionId}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onUpdateQuestion = (typeName: string) => {
    updateTypeMutation.mutate({
      id: selectedQuestionId ?? 0,
      question: {
        type: typeName,
      },
    });
  };

    return {
        typesList,
        onUpdateQuestion,
    }
}