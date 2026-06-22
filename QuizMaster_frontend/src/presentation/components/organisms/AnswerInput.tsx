import type { Socket } from "socket.io-client";
import type { Answer } from "../../../core/domain/entities/Answer";
import { QCMAnswerInput } from "./answerInputTypes/QCMAnswerInput";

interface AnswerInputProps {
  answers: Answer[];
  questionType: string;
  socket: Socket | null;
  playerId: string | null | undefined;
  roomCode?: string;
  timerRunning: boolean;
}

export const AnswerInput = ({ answers, questionType, socket, playerId, roomCode, timerRunning }: AnswerInputProps) => {

  switch (questionType) {
    case "QCM":
      return <QCMAnswerInput answers={answers} socket={socket} playerId={playerId} roomCode={roomCode} timerRunning={timerRunning} />;
      break;

    default:
      break;
  }
};