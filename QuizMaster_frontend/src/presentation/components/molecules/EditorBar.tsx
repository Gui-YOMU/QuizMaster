import { CircleQuestionMark, Eye, Settings, Trash2 } from "lucide-react";
import { IconButton } from "../atoms/IconButton";
import { EditorNavButton } from "../atoms/EditorNavButton";

interface EditorBarProps {
  selectedQuestionId: number;
  onDelete: (questionId: number) => void;
}

export const EditorBar = ({ selectedQuestionId, onDelete }: EditorBarProps) => {
  return (
    <>
      {selectedQuestionId !== null && (
        <div className="bg-mainpurple rounded-xl p-2 flex justify-between w-full">
          <div className="flex justify-center items-center gap-10">
            <EditorNavButton
              to={`/questionView/${selectedQuestionId}`}
              icon={<Eye size={20} color="white" />}
              bgColor="bg-mainblue"
            />
            <EditorNavButton
              to={`/questionType/${selectedQuestionId}`}
              icon={<CircleQuestionMark size={20} color="white" />}
              bgColor="bg-mainblue"
            />
            <EditorNavButton
              to={`/questionParams/${selectedQuestionId}`}
              icon={<Settings size={20} color="white" />}
              bgColor="bg-mainblue"
            />
          </div>
          <div>
            <IconButton
              onClick={() => onDelete(selectedQuestionId)}
              icon={<Trash2 size={20} color="white" />}
              bgColor="bg-error"
              value={0}
              border={true}
            />
          </div>
        </div>
      )}
    </>
  );
};
