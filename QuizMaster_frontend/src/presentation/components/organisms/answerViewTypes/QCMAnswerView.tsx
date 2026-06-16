import type { Answer } from "../../../../core/domain/entities/Answer";
import { Card } from "../../atoms/Card";

interface QCMAnswerViewProps {
  answers: Answer[];
}

const PROPOSITIONS_CARDS = [
  { letter: "A", bgColor: "bg-mainblue" },
  { letter: "B", bgColor: "bg-error" },
  { letter: "C", bgColor: "bg-success" },
  { letter: "D", bgColor: "bg-mainpurple" },
  { letter: "E", bgColor: "bg-warning" },
  { letter: "F", bgColor: "bg-black" },
];

export const QCMAnswerView = ({ answers }: QCMAnswerViewProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {answers.map((answer, index) => (
        <Card
          bgColor={PROPOSITIONS_CARDS[index].bgColor}
          width="w-full"
          height="h-30"
        >
          <div className="w-full flex items-center">
            <div className="flex justify-center items-center border border-white bg-white rounded-full justify-self-start w-10 h-10">
              <h2 className="text-black text-xl">
                {PROPOSITIONS_CARDS[index].letter}
              </h2>
            </div>

            <p className="w-full font-bold text-white text-center">
              {answer.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
