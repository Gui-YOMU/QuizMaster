import { useEffect, useState } from "react";
import { Input } from "../../atoms/Input";
import { Label } from "../../atoms/Label";
import type { CreateAnswerDto } from "../../../../core/application/dtos/Answer/CreateAnswerDto";

interface QCMAnswerParamsProps {
  questionId: number;
  onChangeAnswers: (answers: CreateAnswerDto[]) => void;
  initialAnswers?: CreateAnswerDto[];
}

const PROPOSITIONS_NAMES = ["A", "B", "C", "D", "E", "F"];

export const QCMAnswerParams = ({
  questionId,
  onChangeAnswers,
  initialAnswers,
}: QCMAnswerParamsProps) => {
  const [answers, setAnswers] = useState<CreateAnswerDto[]>(
    initialAnswers && initialAnswers.length > 0
      ? initialAnswers
      : PROPOSITIONS_NAMES.map((_, index) => ({
          value: "",
          isGoodAnswer: index === 0,
          id_question: questionId,
        })),
  );

  const [answersNumber, setAnswersNumber] = useState(answers.length);

  useEffect(() => {
    onChangeAnswers(answers);
  }, [answers]);

  const changeProposition = (index: number, value: string) => {
    setAnswers(
      answers?.map((answer, i) =>
        i === index ? { ...answer, value } : answer,
      ),
    );
  };

  const changeCorrectAnswer = (index: number) => {
    setAnswers(
      answers?.map((answer, i) => ({
        ...answer,
        isGoodAnswer: i === index,
      })),
    );
  };

  const changeAnswersNumber = (newNumber: number) => {
    setAnswersNumber(newNumber);
    setAnswers((prev) => {
      if (newNumber <= prev.length) {
        const truncated = prev.slice(0, newNumber);
        const hasGoodAnswer = truncated.some((answer) => answer.isGoodAnswer);
        return hasGoodAnswer
          ? truncated
          : truncated.map((answer, i) => ({
              ...answer,
              isGoodAnswer: i === 0,
            }));
      }
      const additionalAnswers = PROPOSITIONS_NAMES.slice(
        prev.length,
        newNumber,
      ).map((_) => ({
        value: "",
        isGoodAnswer: false,
        id_question: questionId,
      }));
      return [...prev, ...additionalAnswers];
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-5">
        <Label
          htmlFor="answersNumber"
          content="Nombre de propositions"
          mandatory={true}
          color="text-black"
        />
        <select className="bg-card border border-border rounded-lg pt-1 pb-1 pr-4 pl-4 w-fit"
          value={answersNumber}
          onChange={(e) => changeAnswersNumber(parseInt(e.target.value))}
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
      <div>
        <Label
          htmlFor="answers"
          content="Propositions de réponse (cocher la bonne proposition)"
          mandatory={true}
          color="text-black"
        />
        <div className="grid grid-cols-2 gap-5 p-3">
          {answers?.map((answer, index) => (
            <div key={index} className="flex items-center gap-5">
              <input
                type="radio"
                name="correctAnswer"
                checked={answer.isGoodAnswer}
                onChange={() => changeCorrectAnswer(index)}
              />
              <Input
                type="text"
                name="answers"
                placeholder={`Proposition ${PROPOSITIONS_NAMES[index]}`}
                value={answer.value}
                onChange={(e) => changeProposition(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
