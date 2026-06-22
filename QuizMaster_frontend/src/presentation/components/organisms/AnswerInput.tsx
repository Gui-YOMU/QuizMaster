import type { Socket } from "socket.io-client";
import type { Answer } from "../../../core/domain/entities/Answer";
import { QCMAnswerInput } from "./answerInputTypes/QCMAnswerInput";

interface AnswerInputProps {
  answers: Answer[];
  questionType: string;
  socket: Socket | null;
  playerId: string | null | undefined;
  roomCode?: string;
}

export const AnswerInput = ({ answers, questionType, socket, playerId, roomCode }: AnswerInputProps) => {

  switch (questionType) {
    case "QCM":
      return <QCMAnswerInput answers={answers} socket={socket} playerId={playerId} roomCode={roomCode} />;
      break;

    default:
      break;
  }
};