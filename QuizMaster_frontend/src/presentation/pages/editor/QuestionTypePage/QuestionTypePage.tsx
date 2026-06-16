import { TypeCard } from "../../../components/organisms/TypeCard";
import { useQuestionTypePageViewModel } from "./useQuestionTypePageViewModel";

export const QuestionTypePage = () => {
  const vm = useQuestionTypePageViewModel();

  return (
    <div className="grid grid-cols-5 gap-3">
      {vm.typesList.map((type) => (
        <TypeCard key={type.typeName} type={type} onSelectType={vm.onUpdateQuestion} />
      ))}
    </div>
  );
};
