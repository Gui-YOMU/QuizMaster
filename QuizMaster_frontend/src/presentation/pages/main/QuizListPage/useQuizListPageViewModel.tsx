import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { QuizQueries } from "../../../../core/infrastructure/queries/QuizQueries";
import type { Quiz } from "../../../../core/domain/entities/Quiz";
import { useNavigate } from "react-router";
import { useEditor } from "../../../contexts/EditorContext";

export function useQuizListPageViewModel() {
  const { userId } = useAuth();
  const { openEditor } = useEditor();

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");
  const [roomName, setRoomName] = useState("");

  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const { data: selectedQuizData } = useQuery({
    ...QuizQueries.findQuizById(selectedQuizId ?? 0),
    enabled: selectedQuizId !== null,
  });

  const Navigate = useNavigate();

  useEffect(() => {
    if (selectedQuizData) {
      setSelectedQuiz(selectedQuizData);
      setQuizName(selectedQuizData.quizName);
      setDescription(selectedQuizData.description ?? "");
    }
  }, [selectedQuizData]);

  const onUpdateQuizClick = (quizId: number) => {
    setSelectedQuizId(quizId);
    setIsQuizModalOpen(true);
    console.log(`Bouton 'Modifier le quiz ${quizId}' cliqué`);
  };

  const updateQuizMutation = QuizQueries.updateQuiz();
  const deleteQuizMutation = QuizQueries.deleteQuiz();

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    ...updateQuizMutation,
    onSuccess: () => {
      console.log("Modification du quiz réussie.");
      toast.success("Les modifications ont été enregistrées.");
      setIsQuizModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["quizByUser", userId ? parseInt(userId) : 0],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    ...deleteQuizMutation,
    onSuccess: () => {
      console.log("Quiz supprimé !");
      toast.success("Le quiz a bien été supprimé.");
      queryClient.invalidateQueries({
        queryKey: ["quizByUser", userId ? parseInt(userId) : 0],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onUpdateQuizSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate({
      id: selectedQuiz?.id ?? 0,
      quiz: {
        quizName: quizName.trim().length !== 0 ? quizName : undefined,
        description: description.trim().length !== 0 ? description : undefined,
      },
    });
  };

  const onDelete = (quizId: number) => {
    deleteMutation.mutate(quizId);
    console.log("Quiz supprimé.");
  };

  const onStartGameClick = (quizId: number) => {
    setSelectedQuizId(quizId);
    setIsRoomModalOpen(true);
    console.log("Bouton 'Démarrer une partie' cliqué");
  };

  const onRoomSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`${roomName} ouverte.`);
  };

  const onEditQuizClick = (quizId: number) => {
    openEditor(quizId);
    Navigate(`/quizMain/${quizId}`);
  };

  const {
    isPending,
    isError,
    data: quizList,
    error,
  } = useQuery(QuizQueries.findAllQuizByUser(userId ? parseInt(userId) : 0));

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["quizByUser", userId ? parseInt(userId) : 0],
    });
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return {
    isPending,
    isError,
    error,
    quizList,
    selectedQuiz,
    isQuizModalOpen,
    isRoomModalOpen,
    quizName,
    description,
    setIsQuizModalOpen,
    setIsRoomModalOpen,
    setQuizName,
    setDescription,
    onUpdateQuizSubmit,
    onUpdateQuizClick,
    onDelete,
    onEditQuizClick,
    onStartGameClick,
    setRoomName,
    onRoomSubmit,
  };
}
