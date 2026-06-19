import { Timer, Trophy } from "lucide-react";
import type { Answer } from "../../../core/domain/entities/Answer";
import { Card } from "../atoms/Card";
import { AnswerView } from "./AnswerView";

interface QuestionViewProps {
  subject: string;
  query: string;
  timer: number;
  points: number;
  type: string;
  answers: Answer[];
  playerAnswering: boolean;
}

export const QuestionView = ({
  subject,
  query,
  points,
  timer,
  type,
  answers,
  playerAnswering,
}: QuestionViewProps) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-1/3 flex flex-col justify-around">
        <div className="flex justify-center items-center gap-2 h-1/2">
          <Card bgColor="bg-maingold" width="w-1/6" height="h-full">
            <div className="flex justify-center items-center gap-2 p-2">
              <Timer size={60} color="white" />
              <h2 className="text-3xl text-white font-bold">
                {timer} s
              </h2>
            </div>
          </Card>
          <Card bgColor="bg-mainblue" width="w-2/3" height="h-full">
            <div className="h-full flex justify-center items-center gap-2 p-2">
              <h2 className="text-3xl text-white font-bold">
                {subject}
              </h2>
            </div>
          </Card>
          <Card bgColor="bg-maingold" width="w-1/6" height="h-full">
            <div className="flex justify-center items-center gap-2 p-2">
              <Trophy size={60} color="white" />
              <h2 className="text-3xl text-white font-bold">
                {points}
              </h2>
            </div>
          </Card>
        </div>
        <div className="border-3 rounded-xl border-border bg-white h-2/5 flex justify-center items-center">
          <h2 className="text-2xl text-black font-bold">{query}</h2>
        </div>
      </div>
      <div className="h-3/5">
        {!playerAnswering && <AnswerView questionType={type} answers={answers} />}
      </div>
    </div>
  );
};
