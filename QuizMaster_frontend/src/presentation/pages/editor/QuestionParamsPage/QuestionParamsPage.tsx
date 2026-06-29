import { Button } from "../../../components/atoms/Button";
import { FormItem } from "../../../components/molecules/FormItem";
import { AnswerParams } from "../../../components/organisms/AnswerParams";
import { useQuestionParamsPageViewModel } from "./useQuestionParamsPageViewModel";

export const QuestionParamsPage = () => {
  const vm = useQuestionParamsPageViewModel();

  return (
    <form
      className="flex flex-col justify-center items-center p-3"
      onSubmit={vm.onSubmitQuestionParams}
    >
      <h2 className="font-bold text-xl">Paramètres de base</h2>
      <div className="w-full flex justify-between items-center p-5">
        <div className="w-1/10">
          <FormItem
            color="text-black"
            name="timer"
            type="number"
            placeholder="Timer"
            content="Timer (secondes)"
            value={vm.questionTimer}
            min={0}
            mandatory={true}
            onChange={(e) => vm.setQuestionTimer(parseInt(e.target.value))}
          />
        </div>
        <div className="w-3/5">
          <FormItem
            color="text-black"
            name="subject"
            type="text"
            placeholder="Thématique"
            content="Thématique"
            value={vm.questionSubject}
            mandatory={true}
            onChange={(e) => vm.setQuestionSubject(e.target.value)}
          />
        </div>
        <div className="w-1/10">
          <FormItem
            color="text-black"
            name="points"
            type="number"
            placeholder="Score"
            content="Score"
            value={vm.questionPoints}
            min={0}
            mandatory={true}
            onChange={(e) => vm.setQuestionPoints(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="w-full p-5">
        <FormItem
          color="text-black"
          name="query"
          type="text"
          placeholder="Question"
          content="Intitulé de la question"
          value={vm.questionQuery}
          mandatory={true}
          onChange={(e) => vm.setQuestionQuery(e.target.value)}
        />
      </div>

      {/* Composant modulable */}
      
      <h2 className="font-bold text-xl">Paramètres spécifiques</h2>
      <div className="w-full p-5">
        <AnswerParams questionType={vm.questionType} initialAnswers={vm.answers} onChangeAnswers={vm.setAnswers} />
      </div>
      <Button
        bgColor="bg-mainblue"
        width="w-fit"
        content="Visualiser la question"
      />
    </form>
  );
};
