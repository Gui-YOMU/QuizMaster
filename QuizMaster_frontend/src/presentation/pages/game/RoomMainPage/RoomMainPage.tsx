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
import { X } from "lucide-react";

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

  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    socket?.emit("get-room-info", { roomCode });
  }, [socket, roomCode]);

  useEffect(() => {
    socket?.on("players-list", ({ players, hostId }) => {
      setHostId(hostId);
      setPlayersList(players);
    });

    socket?.on("view-question", ({ question, answers }) => {
      setCurrentQuestion(question);
      setAnswers(answers);
      setQuizStarted(true);
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
    <>
      <div>
        <IconButton
          border={true}
          onClick={onLeave}
          icon={<X size={40} color="white" />}
          bgColor="bg-error"
        />
      </div>
      {!quizStarted && (
        <div>
          <h1>Accueil de la salle</h1>
          <div>{`Code de la salle : ${roomCode}`}</div>
          <h2>Liste des joueurs : </h2>
          <div>
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
          <div>
            {hostId === userId && (
              <Button
                bgColor="bg-mainblue"
                content="Démarrer le quiz"
                width="w-fit"
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
      {quizStarted && hostId === userId && (
        <div>
          <div>
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
              content="Question suivante"
              width="w-fit"
              onClick={() => {
                socket?.emit("next-question", {
                  roomCode,
                });
              }}
            />
          </div>
        </div>
      )}
      {quizStarted && hostId !== userId && (
        <div>
          <div>
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
        </div>
      )}
    </>
  );
};
