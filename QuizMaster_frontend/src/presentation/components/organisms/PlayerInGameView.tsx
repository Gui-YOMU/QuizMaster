import type { Socket } from "socket.io-client";
import type { Answer } from "../../../core/domain/entities/Answer";
import type { Question } from "../../../core/domain/entities/Question";
import { IconButton } from "../atoms/IconButton";
import { useNavigate } from "react-router";
import { X } from "lucide-react";
import { Card } from "../atoms/Card";
import { CardTitle } from "../atoms/CardTitle";
import { Title } from "../atoms/Title";
import { QuestionPlayView } from "./QuestionPlayView";

interface PlayerInGameViewProps {
  quizStarted: boolean;
  quizEnded: boolean;
  roomCode: string | undefined;
  playersList: { id: string; name: string; score: number }[];
  socket: Socket | null;
  currentQuestion: Question | null;
  answers: Answer[];
  userId: string | null;
  questionNumber: number;
}

export const PlayerInGameView = ({
  quizStarted,
  quizEnded,
  roomCode,
  playersList,
  socket,
  currentQuestion,
  answers,
  userId,
  questionNumber,
}: PlayerInGameViewProps) => {
  const Navigate = useNavigate();

  const player = playersList.find((player) => player.id === (userId ?? "0"));

  console.log("playersList:", playersList);
  console.log("userId parsé:", parseInt(userId ?? "0"));

  return (
    <div className="w-full h-full flex flex-col justify-start gap-5">
      <div>
        <IconButton
          border={true}
          onClick={() => {
            socket?.emit("player-leave-room", { roomCode, playerId: userId });
            Navigate("/playerDashboard");
          }}
          icon={<X size={40} color="white" />}
          bgColor="bg-error"
        />
      </div>
      {!quizStarted && !quizEnded && (
        <div className="w-full h-full flex justify-center items-center">
          <Card bgColor="bg-warning" width="w-3/4" height="h-fit">
            <CardTitle content="En attente du début du quiz" />
            <Title content={`${roomCode}`} color="text-black" />
          </Card>
        </div>
      )}
      {quizStarted && !quizEnded && (
        <div className="w-full h-full">
          {currentQuestion && (
            <QuestionPlayView
              {...currentQuestion}
              type={currentQuestion.type ?? ""}
              subject={currentQuestion.subject ?? ""}
              answers={answers}
              playerAnswering={true}
              questionNumber={questionNumber}
              socket={socket}
              playerId={userId}
              roomCode={roomCode}
            />
          )}
        </div>
      )}
      {quizEnded && (
        <div className="w-full h-full flex justify-center items-center">
          <Card bgColor="bg-maingold" width="w-50" height="h-50">
            <CardTitle content="Votre score" />
            <Title content={`${player?.score} points`} color="text-black" />
          </Card>
        </div>
      )}
    </div>
  );
};
