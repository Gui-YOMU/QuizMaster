import type { Socket } from "socket.io-client";
import type { Answer } from "../../../../core/domain/entities/Answer";
import { Button } from "../../atoms/Button";

interface QCMAnswerInputProps {
  answers: Answer[];
  socket: Socket | null;
}

const PROPOSITIONS_CARDS = [
  { letter: "A", bgColor: "bg-mainblue" },
  { letter: "B", bgColor: "bg-error" },
  { letter: "C", bgColor: "bg-success" },
  { letter: "D", bgColor: "bg-mainpurple" },
  { letter: "E", bgColor: "bg-warning" },
  { letter: "F", bgColor: "bg-black" },
];

export const QCMAnswerInput = ({ answers, socket }: QCMAnswerInputProps) => {
  const onAnswering = (isGoodAnswer: boolean) => {
    isGoodAnswer ? console.log(`Bonne réponse cliquée`) : console.log(`Mauvaise réponse cliquée`);
    socket?.emit("player-answer", {isGoodAnswer});
  };

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {answers.map((answer, index) => (
        <Button
          key={answer.id}
          bgColor={PROPOSITIONS_CARDS[index].bgColor}
          width="w-full"
          content={answer.value}
          onClick={() => onAnswering(answer.isGoodAnswer)}
        />
      ))}
    </div>
  );
};
