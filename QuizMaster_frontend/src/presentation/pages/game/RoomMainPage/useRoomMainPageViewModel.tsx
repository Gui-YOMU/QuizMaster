import { useParams } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { useGame } from "../../../contexts/GameContext";
import { useEffect, useState } from "react";
import type { Question } from "../../../../core/domain/entities/Question";
import type { Answer } from "../../../../core/domain/entities/Answer";

export function useRoomMainPageViewModel() {
  const { userId } = useAuth();

  const { roomCode } = useParams<{ roomCode: string }>();

  const { socket } = useGame();

  const [hostId, setHostId] = useState<string>("");

  const [playersList, setPlayersList] = useState<
    { id: number; name: string; score: number }[]
  >([]);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    socket?.emit("get-room-info", { roomCode });
  }, [socket, roomCode]);

  useEffect(() => {
    socket?.on("players-list", ({ players, hostId }) => {
      setHostId(hostId);
      setPlayersList(players);
    });

    socket?.on("view-question", ({ question, answers, isLastQuestion }) => {
      setCurrentQuestion(question);
      setAnswers(answers);
      setQuizStarted(true);
      setIsLastQuestion(isLastQuestion);
    });

    socket?.on("quiz-ended", ({ players }) => {
      setPlayersList(players);
      setQuizEnded(true);
    });

    return () => {
      socket?.off("players-list");
      socket?.off("view-question");
    };
  }, [socket]);

  return {
    userId,
    hostId,
    playersList,
    currentQuestion,
    answers,
    isLastQuestion,
    quizStarted,
    quizEnded,
    roomCode,
    socket,
  };
}
