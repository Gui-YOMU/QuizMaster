import { ChevronUp, ExternalLink, PenTool, Play, Trash2 } from "lucide-react";
import { IconButton } from "../atoms/IconButton";

interface QuizButtonBarProps {
  quizId: number;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onPlay: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}
export const QuizButtonBar = ({ quizId, onClose, onPlay, onEdit, onUpdate, onDelete }: QuizButtonBarProps) => {
  return (
    <div className="w-8/10 flex justify-between">
      <IconButton
        border={true}
        onClick={() => onPlay(quizId)}
        icon={<Play size={20} color="white" />}
        bgColor="bg-success"
        value={quizId}
      />
      <IconButton
        border={true}
        onClick={() => onEdit(quizId)}
        icon={<ExternalLink size={20} color="white" />}
        bgColor="bg-mainblue"
        value={quizId}
      />
      <IconButton
        border={true}
        onClick={() => onUpdate(quizId)}
        icon={<PenTool transform="rotate(-90)" size={20} color="white" />}
        bgColor="bg-maingold"
        value={quizId}
      />
      <IconButton
        border={true}
        onClick={() => onDelete(quizId)}
        icon={<Trash2 size={20} color="white" />}
        bgColor="bg-error"
        value={quizId}
      />
      <IconButton
        border={false}
        onClick={onClose}
        icon={<ChevronUp size={20} color="white" />}
        bgColor="bg-none"
      />
    </div>
  );
};
