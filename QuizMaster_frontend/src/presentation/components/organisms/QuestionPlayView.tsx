import { Trophy } from "lucide-react";
import type { Answer } from "../../../core/domain/entities/Answer";
import { Card } from "../atoms/Card";
import { AnswerView } from "./AnswerView";
import { AnswerInput } from "./AnswerInput";
import type { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

interface QuestionPlayViewProps {
  subject: string;
  query: string;
  timer: number;
  points: number;
  type: string;
  answers: Answer[];
  playerAnswering: boolean;
  questionNumber: number;
  socket: Socket | null;
  playerId?: string | null;
  roomCode?: string;
}

export const QuestionPlayView = ({
  subject,
  query,
  points,
  timer,
  type,
  answers,
  playerAnswering,
  questionNumber,
  socket,
  playerId,
  roomCode,
}: QuestionPlayViewProps) => {
  const [timeLeft, setTimeLeft] = useState(timer);
  const [timerRunning, setTimerRunning] = useState(false);

  const barColor = () => {
    const ratio = timeLeft / timer;
    if (ratio > 0.5) {
      return "bg-success";
    }
    if (ratio > 0.25) {
      return "bg-warning";
    }
    return "bg-error";
  };

  useEffect(() => {
    setTimeLeft(timer);
    setTimerRunning(false);

    socket?.on("timer", ({ timeLeft }) => {
      setTimerRunning(true);
      setTimeLeft(timeLeft);
    });

    return () => {
      socket?.off("timer");
    };
  }, [socket, questionNumber]);

  useEffect(() => {
    socket?.on("timer-ended", () => {
      setTimerRunning(false);
    });

    return () => {
      socket?.off("timer-ended");
    };
  }, [socket]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-1/3 flex flex-col justify-around">
        <div className="flex justify-center items-center gap-2 h-1/2">
          <Card bgColor="bg-maingold" width="w-1/6" height="h-full">
            <div className="flex justify-center items-center gap-2 p-2 flex-col lg:flex-row">
              <h2 className="text-center text-2xl lg:text-3xl text-white font-bold">
                {questionNumber}
              </h2>
            </div>
          </Card>
          <Card bgColor="bg-mainblue" width="w-5/6" height="h-full">
            <div className="h-full flex justify-center items-center gap-2 p-2">
              <h2 className="text-center text-2xl lg:text-3xl text-white font-bold">
                {subject}
              </h2>
            </div>
          </Card>
          <Card bgColor="bg-maingold" width="w-1/6" height="h-full">
            <div className="flex justify-center items-center gap-2 p-2 flex-col lg:flex-row">
              <Trophy size={60} color="white" />
              <h2 className="text-2xl lg:text-3xl text-white font-bold">
                {points}
              </h2>
            </div>
          </Card>
        </div>
        <div
          style={{ width: `${(timeLeft / timer) * 100}%` }}
          className={`my-2 h-5 ${barColor()} transition-all duration-1000 ease-linear`}
        ></div>
        <div className="border-3 rounded-xl border-border bg-white h-2/5 flex justify-center items-center">
          <h2 className="text-center text-lg lg:text-2xl text-black font-bold">
            {query}
          </h2>
        </div>
      </div>
      <div className="h-3/5">
        {!playerAnswering && (
          <AnswerView questionType={type} answers={answers} />
        )}
        {playerAnswering && (
          <AnswerInput
            questionType={type}
            answers={answers}
            socket={socket}
            playerId={playerId}
            roomCode={roomCode}
            timerRunning={timerRunning}
          />
        )}
      </div>
    </div>
  );
};
