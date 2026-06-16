import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { QuizQueries } from "../../../../core/infrastructure/queries/QuizQueries";
import { useNavigate } from "react-router";
import { useEditor } from "../../../contexts/EditorContext";
import { useGame } from "../../../contexts/GameContext";

export function useQuizListPageViewModel() {
  const { userId } = useAuth();
  const { openEditor } = useEditor();
  const { socket } = useGame();

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

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  const Navigate = useNavigate();

  const selectedQuiz = useMemo(
    () => quizList?.find((quiz) => quiz.id === selectedQuizId) ?? null,
    [quizList, selectedQuizId],
  );

  useEffect(() => {
    if (selectedQuiz) {
      setQuizName(selectedQuiz.quizName);
      setDescription(selectedQuiz.description ?? "");
    }
  }, [selectedQuiz]);

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
    socket?.emit("create-room", { hostId: userId, quizId: selectedQuizId });
    console.log(`Salle ${selectedQuizId} ouverte.`);
    socket?.on("room-created", ({ roomCode }: { roomCode: string }) => {
      console.log(roomCode);
      Navigate(`/roomMain/${roomCode}`);
    });
  };

  const onEditQuizClick = (quizId: number) => {
    openEditor(quizId);
    Navigate(`/quizMain/${quizId}`);
  };

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
    onRoomSubmit,
    setSelectedQuizId,
  };
}
