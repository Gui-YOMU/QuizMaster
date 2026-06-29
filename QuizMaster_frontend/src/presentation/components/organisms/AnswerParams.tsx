import { QCMAnswerParams } from "./answerParamsTypes/QCMAnswerParams";
import type { CreateAnswerDto } from "../../../core/application/dtos/Answer/CreateAnswerDto";
import { useOutletContext } from "react-router";

interface AnswerParamsProps {
  questionType: string;
  initialAnswers: CreateAnswerDto[];
  onChangeAnswers: React.Dispatch<React.SetStateAction<CreateAnswerDto[]>>;
}

export const AnswerParams = ({
  questionType,
  initialAnswers,
  onChangeAnswers,
}: AnswerParamsProps) => {
  const { selectedQuestionId } = useOutletContext<{
    selectedQuestionId: number;
  }>();

  // Switch du composant

  switch (questionType) {
    case "QCM":
      return (
        <QCMAnswerParams
          questionId={selectedQuestionId}
          initialAnswers={initialAnswers}
          onChangeAnswers={onChangeAnswers}
        />
      );
      break;

    default:
      break;
  }
};
