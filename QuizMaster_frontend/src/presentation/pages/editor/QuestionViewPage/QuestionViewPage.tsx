import { QuestionEditorView } from "../../../components/organisms/QuestionEditorView";
import { useQuestionViewPageViewModel } from "./useQuestionViewPageViewModel";

export const QuestionViewPage = () => {
  const vm = useQuestionViewPageViewModel();

  return <QuestionEditorView {...vm} />;
};
