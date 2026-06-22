import { Play, X } from "lucide-react";
import { IconButton } from "../atoms/IconButton";
import { Card } from "../atoms/Card";
import { CardTitle } from "../atoms/CardTitle";
import { Title } from "../atoms/Title";
import { Button } from "../atoms/Button";
import { QuestionPlayView } from "./QuestionPlayView";
import type { Socket } from "socket.io-client";
import type { Answer } from "../../../core/domain/entities/Answer";
import { useNavigate } from "react-router";
import type { Question } from "../../../core/domain/entities/Question";

interface HostInGameViewProps {
  quizStarted: boolean;
  quizEnded: boolean;
  roomCode: string | undefined;
  playersList: { id: number; name: string; score: number }[];
  socket: Socket | null;
  currentQuestion: Question | null;
  isLastQuestion: boolean;
  answers: Answer[];
  questionNumber: number;
}

export const HostInGameView = ({
  quizStarted,
  quizEnded,
  roomCode,
  playersList,
  socket,
  currentQuestion,
  isLastQuestion,
  answers,
  questionNumber,
}: HostInGameViewProps) => {
  const Navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-start gap-5">
      <div>
        <IconButton
          border={true}
          onClick={() => {
            socket?.emit("host-leave-room");
            Navigate("/creatorDashboard");
          }}
          icon={<X size={40} color="white" />}
          bgColor="bg-error"
        />
      </div>
      {!quizStarted && !quizEnded && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full h-full flex justify-center items-center">
            <Card bgColor="bg-maingold" width="w-1/4" height="h-40">
              <CardTitle content="Code de la salle" />
              <Title content={`${roomCode}`} color="text-black" />
            </Card>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <Card bgColor="bg-mainpurple" width="w-4/5" height="h-full">
              <CardTitle content="Liste des joueurs" />
              <div className="grid grid-cols-5">
                {playersList.map((player) => (
                  <Card
                    key={player.id}
                    bgColor="bg-mainblue"
                    width="w-fit"
                    height="h-fit"
                  >
                    <Title color="text-white" content={player.name} />
                  </Card>
                ))}
              </div>
            </Card>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <IconButton
              bgColor="bg-success"
              icon={<Play size={60} color="" fill="white" />}
              border={false}
              onClick={() => {
                console.log(`Commencer le quiz de la salle ${roomCode}`);
                console.log(
                  "emit start-quiz, roomCode:",
                  roomCode,
                  "socket:",
                  socket?.id,
                );
                socket?.emit("start-quiz", {
                  roomCode,
                });
              }}
            />
          </div>
        </div>
      )}
      {quizStarted && !quizEnded && (
        <div className="w-full h-full flex flex-col">
          <div className="h-9/10">
            {currentQuestion && (
              <QuestionPlayView
                {...currentQuestion}
                type={currentQuestion.type ?? ""}
                subject={currentQuestion.subject ?? ""}
                answers={answers}
                playerAnswering={false}
                questionNumber={questionNumber}
                socket={socket}
              />
            )}
          </div>
          <div>
            <Button
              bgColor="bg-mainblue"
              content={
                isLastQuestion ? "Terminer le quiz" : "Question suivante"
              }
              width="w-fit"
              onClick={() => {
                console.log(quizEnded);

                socket?.emit("next-question", {
                  roomCode,
                });
              }}
            />
          </div>
        </div>
      )}
      {quizStarted && quizEnded && (
        <div>
          {playersList.map((player) => (
            <Card
              key={player.id}
              bgColor="bg-mainblue"
              width="w-50"
              height="h-50"
            >
              <p>{player.name}</p>
              <p>{player.score}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
