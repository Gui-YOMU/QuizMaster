import { UserQueries } from "../../../../core/infrastructure/queries/UserQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { QuizQueries } from "../../../../core/infrastructure/queries/QuizQueries";
import { useEditor } from "../../../contexts/EditorContext";
import { useGame } from "../../../contexts/GameContext";

export function useCreatorDashboardPageViewModel() {
  const { userId } = useAuth();
  const { openEditor } = useEditor();
  const { socket } = useGame();

  const {
    isPending: isUserPending,
    isError: isUserError,
    data: user,
    error: userError,
  } = useQuery(UserQueries.findUserById(userId ? parseInt(userId) : 0));

  const {
    isPending: isQuizPending,
    isError: isQuizError,
    data: quizList,
    error: quizError,
  } = useQuery(QuizQueries.findAllQuizByUser(userId ? parseInt(userId) : 0));

  useEffect(() => {
    if (isUserError) {
      toast.error(userError.message);
    }
    if (isQuizError) {
      toast.error(quizError.message);
    }
  }, [isUserError, userError, isQuizError, quizError]);

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

  const selectedQuiz = useMemo(
    () => quizList?.find((q) => q.id === selectedQuizId) ?? null,
    [quizList, selectedQuizId],
  );

  const Navigate = useNavigate();

  const queryClient = useQueryClient();

  const createQuizMutation = QuizQueries.createQuiz();

  const quizMutation = useMutation({
    ...createQuizMutation,
    onSuccess: (data) => {
      console.log("Création du quiz réussie.");
      toast.success("Le nouveau quiz a bien été créé.");
      queryClient.invalidateQueries({
        queryKey: ["users", userId ? parseInt(userId) : 0],
      });
      queryClient.invalidateQueries({
        queryKey: ["quizByUser", userId ? parseInt(userId) : 0],
      });
      openEditor(data.id ? data.id : 0);
      Navigate(`/quizMain/${data.id}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const onQuizSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    quizMutation.mutate({
      quizName,
      description: description.trim().length !== 0 ? description : undefined,
      id_user: userId ? parseInt(userId) : 0,
    });
  };

  const onCreateQuizClick = () => {
    setIsQuizModalOpen(true);
    console.log("Bouton 'Créer un quiz' cliqué");
  };

  const onStartGameClick = () => {
    setIsRoomModalOpen(true);
    console.log("Bouton 'Démarrer une partie' cliqué");
  };

  const onRoomSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("create-room", { hostId: userId, quizId: selectedQuizId });
    console.log(`Salle ${selectedQuizId} créée.`);
    socket?.on("room-created", ({ roomCode }: { roomCode: string }) => {
      console.log(roomCode);
      Navigate(`/roomMain/${roomCode}`)
    });
  };

  return {
    isPending: isUserPending || isQuizPending,
    isError: isUserError || isQuizError,
    userError,
    quizError,
    user,
    quizList,
    onCreateQuizClick,
    onStartGameClick,
    isQuizModalOpen,
    isRoomModalOpen,
    setIsQuizModalOpen,
    setIsRoomModalOpen,
    setQuizName,
    setDescription,
    onQuizSubmit,
    onRoomSubmit,
    setSelectedQuizId,
    selectedQuiz,
  };
}
