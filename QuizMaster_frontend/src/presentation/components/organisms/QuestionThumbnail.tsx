import { useQuery } from "@tanstack/react-query";
import type { Question } from "../../../core/domain/entities/Question";
import { AnswerQueries } from "../../../core/infrastructure/queries/AnswerQueries";
import { QuestionEditorView } from "./QuestionEditorView";

interface QuestionThumbnailProps {
  question: Question;
  isSelected: boolean;
  onClick: () => void;
}

export const QuestionThumbnail = ({
  question,
  isSelected,
  onClick,
}: QuestionThumbnailProps) => {
  const { data: answers } = useQuery({
    ...AnswerQueries.findAllAnswersByQuestion(question.id ?? 0),
    enabled: question.id !== undefined,
  });

  return (
    <div
      onClick={onClick}
      className={`relative w-40 h-24 overflow-hidden rounded-lg border-3 cursor-pointer shrink-0 transition-colors ${
        isSelected ? "border-mainblue" : "border-border"
      }`}
    >
      <div className="absolute top-0 left-0 w-5xl h-144 origin-top-left scale-[0.15625] pointer-events-none">
        <QuestionEditorView
          subject={question.subject ?? ""}
          points={question.points}
          query={question.query}
          timer={question.timer}
          type={question.type ?? ""}
          answers={answers ?? []}
        />
      </div>
    </div>
  );
};
