import { useState } from "react";
import { CardTitle } from "../atoms/CardTitle";
import { IconButton } from "../atoms/IconButton";
import { Card } from "../atoms/Card";
import { QuizButtonBar } from "../molecules/QuizButtonBar";
import { ChevronDown } from "lucide-react";
import type { Quiz } from "../../../core/domain/entities/Quiz";

interface QuizCardProps {
  quiz: Quiz;
  onPlay: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const QuizCard = ({
  quiz,
  onPlay,
  onEdit,
  onUpdate,
  onDelete,
}: QuizCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardHeight, setCardHeight] = useState("h-50");

  const closeQuizCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCardHeight("h-50");
    setIsOpen(false);
  };

  return (
    <Card bgColor="bg-mainpurple" width="w-full" height={cardHeight}>
      <CardTitle content={quiz.quizName} />
      <p className="text-white">{quiz.description ? quiz.description : ""}</p>
      <div className="w-8/10 flex justify-end">
        {!isOpen && (
          <IconButton
            border={false}
            onClick={(e) => {
              e.preventDefault();
              setCardHeight("h-75");
              setIsOpen(true);
            }}
            icon={<ChevronDown size={20} color="white" />}
            bgColor="bg-none"
          />
        )}
      </div>

      {isOpen && (
        <QuizButtonBar
          quizId={quiz.id ? quiz.id : 0}
          onClose={closeQuizCard}
          onPlay={onPlay}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </Card>
  );
};
