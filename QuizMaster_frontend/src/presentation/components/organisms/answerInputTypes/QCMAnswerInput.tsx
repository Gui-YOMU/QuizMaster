import type { Socket } from "socket.io-client";
import type { Answer } from "../../../../core/domain/entities/Answer";
import { Button } from "../../atoms/Button";
import { useEffect, useState } from "react";

interface QCMAnswerInputProps {
  answers: Answer[];
  socket: Socket | null;
  playerId: string | null | undefined;
  roomCode?: string;
}

const PROPOSITIONS_CARDS = [
  { letter: "A", bgColor: "bg-mainblue" },
  { letter: "B", bgColor: "bg-error" },
  { letter: "C", bgColor: "bg-success" },
  { letter: "D", bgColor: "bg-mainpurple" },
  { letter: "E", bgColor: "bg-warning" },
  { letter: "F", bgColor: "bg-black" },
];

export const QCMAnswerInput = ({
  answers,
  socket,
  playerId,
  roomCode,
}: QCMAnswerInputProps) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setHasAnswered(false);
    setSelectedAnswer(null);
  }, [answers]);

  const onAnswering = (isGoodAnswer: boolean, answerId: number | null) => {
    if (hasAnswered) return;
    setHasAnswered(true);
    setSelectedAnswer(answerId);
    socket?.emit("player-answer", { isGoodAnswer, playerId, roomCode });
  };

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {answers.map((answer, index) => (
        <Button
          key={answer.id}
          bgColor={PROPOSITIONS_CARDS[index].bgColor}
          opacity={hasAnswered && selectedAnswer !== answer.id ? "opacity-50" : ""}
          width="w-full"
          content={answer.value}
          onClick={() => onAnswering(answer.isGoodAnswer, answer.id)}
        />
      ))}
    </div>
  );
};
