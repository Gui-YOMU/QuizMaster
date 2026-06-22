import { useNavigate, useParams } from "react-router";
import { useGame } from "../../../contexts/GameContext";
import { useEffect, useState } from "react";
import { Card } from "../../../components/atoms/Card";
import { Button } from "../../../components/atoms/Button";
import { Question } from "../../../../core/domain/entities/Question";
import { useAuth } from "../../../contexts/AuthContext";
import { QuestionView } from "../../../components/organisms/QuestionView";
import { Answer } from "../../../../core/domain/entities/Answer";
import { IconButton } from "../../../components/atoms/IconButton";
import { Play, X } from "lucide-react";
import { CardTitle } from "../../../components/atoms/CardTitle";
import { Title } from "../../../components/atoms/Title";

export const RoomMainPage = () => {
  const { userId } = useAuth();

  const { roomCode } = useParams<{ roomCode: string }>();

  const { socket } = useGame();

  const Navigate = useNavigate();

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

  const onLeave = () => {
    if (hostId === userId) {
      socket?.emit("host-leave-room");
      Navigate("/creatorDashboard");
    }
    if (hostId !== userId) {
      socket?.emit("player-leave-room", { roomCode, playerId: userId });
      Navigate("/playerDashboard");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start gap-5">
      <div>
        <IconButton
          border={true}
          onClick={onLeave}
          icon={<X size={40} color="white" />}
          bgColor="bg-error"
        />
      </div>
      {(!quizStarted && !quizEnded) && (
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
                    width="w-50"
                    height="h-50"
                  >
                    <p>{player.name}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            {hostId === userId && (
              <IconButton
                bgColor="bg-success"
                icon={<Play size={60} color="" fill="white"/>}
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
            )}
          </div>
        </div>
      )}
      {(quizStarted && !quizEnded) && hostId === userId && (
        <div className="w-full h-full flex flex-col">
          <div className="h-9/10">
            {currentQuestion && (
              <QuestionView
                {...currentQuestion}
                type={currentQuestion.type ?? ""}
                subject={currentQuestion.subject ?? ""}
                answers={answers}
                playerAnswering={false}
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
      {(quizStarted && !quizEnded) && hostId !== userId && (
        <div className="w-full h-full">
          {currentQuestion && (
            <QuestionView
              {...currentQuestion}
              type={currentQuestion.type ?? ""}
              subject={currentQuestion.subject ?? ""}
              answers={answers}
              playerAnswering={true}
            />
          )}
        </div>
      )}
      {(quizStarted && quizEnded) && (
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
