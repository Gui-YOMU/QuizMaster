import { Plus } from "lucide-react";
import type { Question } from "../../../core/domain/entities/Question";
import { IconButton } from "../atoms/IconButton";
import { SideBar } from "../atoms/SideBar";
import { QuestionQueries } from "../../../core/infrastructure/queries/QuestionQueries";
import { useEditor } from "../../contexts/EditorContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { QuestionThumbnail } from "./QuestionThumbnail";

interface EditorSideBarProps {
  questionsList: Question[];
  selectedQuestionId: number;
  onSelect: (questionId: number) => void;
}

export const EditorSideBar = ({
  questionsList,
  onSelect,
  selectedQuestionId,
}: EditorSideBarProps) => {
  const { quizId } = useEditor();

  const Navigate = useNavigate();

  const queryClient = useQueryClient();

  const createQuestionMutation = QuestionQueries.createQuestion();

  const questionMutation = useMutation({
    ...createQuestionMutation,
    onSuccess: (data) => {
      console.log("Création de la question réussie.");
      toast.success("La nouvelle question a bien été créé.");
      queryClient.invalidateQueries({
        queryKey: ["questionsByQuiz", quizId ? parseInt(quizId) : 0],
      });
      Navigate(`/questionType/${data.id}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const addQuestion = () => {
    questionMutation.mutate({
      id_quiz: quizId ? parseInt(quizId) : 0,
    });
  };

  return (
    <>
      <SideBar>
        <IconButton
          border={false}
          onClick={addQuestion}
          icon={<Plus size={20} color="white" />}
          bgColor="bg-mainblue"
        />

        {questionsList.map((question) => (
          <QuestionThumbnail
            key={question.id}
            question={question}
            isSelected={question.id === selectedQuestionId}
            onClick={() => onSelect(question.id ?? 0)}
          />
        ))}
      </SideBar>
    </>
  );
};
