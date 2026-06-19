import { QuestionView } from "../../../components/organisms/QuestionView";
import { useQuestionViewPageViewModel } from "./useQuestionViewPageViewModel";

export const QuestionViewPage = () => {
  const vm = useQuestionViewPageViewModel();

  return <QuestionView {...vm} playerAnswering={false} />;
};
