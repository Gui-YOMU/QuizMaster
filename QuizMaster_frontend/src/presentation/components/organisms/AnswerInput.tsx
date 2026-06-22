import type { Answer } from "../../../core/domain/entities/Answer";
import { QCMAnswerInput } from "./answerInputTypes/QCMAnswerInput";

interface AnswerInputProps {
  answers: Answer[];
  questionType: string;
}

export const AnswerInput = ({ answers, questionType }: AnswerInputProps) => {

  switch (questionType) {
    case "QCM":
      return <QCMAnswerInput answers={answers} />;
      break;

    default:
      break;
  }
};