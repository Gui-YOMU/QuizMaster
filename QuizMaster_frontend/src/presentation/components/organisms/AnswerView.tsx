import type { Answer } from "../../../core/domain/entities/Answer";
import { QCMAnswerView } from "./answerViewTypes/QCMAnswerView";

interface AnswerViewProps {
  answers: Answer[];
  questionType: string;
}

export const AnswerView = ({ answers, questionType }: AnswerViewProps) => {

  switch (questionType) {
    case "QCM":
      return <QCMAnswerView answers={answers} />;
      break;

    default:
      break;
  }
};
