import { Timer, Trophy } from "lucide-react";
import type { Answer } from "../../../core/domain/entities/Answer";
import { Card } from "../atoms/Card";
import { AnswerView } from "./AnswerView";

interface QuestionViewProps {
  questionSubject: string;
  questionQuery: string;
  questionTimer: number;
  questionPoints: number;
  questionType: string;
  answers: Answer[];
}

export const QuestionView = ({
  questionSubject,
  questionQuery,
  questionPoints,
  questionTimer,
  questionType,
  answers,
}: QuestionViewProps) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-1/3 flex flex-col justify-around">
        <div className="flex justify-center items-center gap-2 h-1/2">
          <Card bgColor="bg-maingold" width="w-1/6" height="h-full">
            <div className="flex justify-center items-center gap-2 p-2">
              <Timer size={60} color="white" />
              <h2 className="text-3xl text-white font-bold">
                {questionTimer} s
              </h2>
            </div>
          </Card>
          <Card bgColor="bg-mainblue" width="w-2/3" height="h-full">
            <div className="h-full flex justify-center items-center gap-2 p-2">
              <h2 className="text-3xl text-white font-bold">
                {questionSubject}
              </h2>
            </div>
          </Card>
          <Card bgColor="bg-maingold" width="w-1/6" height="h-full">
            <div className="flex justify-center items-center gap-2 p-2">
              <Trophy size={60} color="white" />
              <h2 className="text-3xl text-white font-bold">
                {questionPoints}
              </h2>
            </div>
          </Card>
        </div>
        <div className="border-3 rounded-xl border-border bg-white h-2/5 flex justify-center items-center">
          <h2 className="text-2xl text-black font-bold">{questionQuery}</h2>
        </div>
      </div>
      <div className="h-3/5">
        <AnswerView questionType={questionType} answers={answers} />
      </div>
    </div>
  );
};
