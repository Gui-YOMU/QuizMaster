import { useGame } from "../../../contexts/GameContext";
import { useEffect, useState } from "react";
import { Question } from "../../../../core/domain/entities/Question";
import { useAuth } from "../../../contexts/AuthContext";
import { Answer } from "../../../../core/domain/entities/Answer";
import { HostInGameView } from "../../../components/organisms/HostInGameView";
import { PlayerInGameView } from "../../../components/organisms/PlayerInGameView";
import { useParams } from "react-router";

export const RoomMainPage = () => {
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

  return (
    <div className="w-full h-full flex flex-col justify-start gap-5">
      {hostId === userId && (
        <HostInGameView
          quizStarted={quizStarted}
          quizEnded={quizEnded}
          roomCode={roomCode}
          playersList={playersList}
          socket={socket}
          currentQuestion={currentQuestion}
          isLastQuestion={isLastQuestion}
          answers={answers}
        />
      )}
      {hostId !== userId && (
        <PlayerInGameView
          quizStarted={quizStarted}
          quizEnded={quizEnded}
          roomCode={roomCode}
          playersList={playersList}
          socket={socket}
          currentQuestion={currentQuestion}
          answers={answers}
          userId={userId}
        />
      )}
    </div>
  );
};
