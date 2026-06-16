import { X } from "lucide-react";
import { IconButton } from "../atoms/IconButton";
import { FormItem } from "../molecules/FormItem";
import { Button } from "../atoms/Button";
import { Label } from "../atoms/Label";
import type { Quiz } from "../../../core/domain/entities/Quiz";

interface RoomModalProps {
  quizList: Quiz[];
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  selectedQuiz?: Quiz | null;
}

export const RoomModal = ({
  quizList,
  onClick,
  setRoomName,
  onSubmit,
  selectedQuiz,
}: RoomModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClick}
    >
      <dialog
        className="absolute top-1/2 left-1/2 -translate-1/2 w-1/2 h-1/2 flex flex-col p-3 border-5 border-border"
        open
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-fit w-fit self-end justify-self-start">
          <IconButton
            border={true}
            onClick={onClick}
            icon={<X size={40} color="white" />}
            bgColor="bg-error"
          />
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <form
            className="border-border border rounded-lg bg-bg p-5 w-9/10 h-9/10 flex flex-col justify-center gap-5"
            onSubmit={onSubmit}
          >
            <FormItem
              color="black"
              name="roomName"
              content="Nom de la salle"
              type="text"
              placeholder="Nom"
              mandatory={true}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <div className="h-1/2 flex flex-col">
              <Label
                htmlFor="description"
                content="Choisir un quiz"
                mandatory={true}
                color="black"
              />
              <select className="bg-card border border-border rounded-lg pt-1 pb-1 pr-4 pl-4 w-full">
                <option value="">Liste des quiz</option>
                {quizList.map((quiz) => (
                  <option
                    key={quiz.id}
                    value={quiz.id?.toString()}
                    selected={selectedQuiz?.id === quiz.id}
                  >
                    {quiz.quizName}
                  </option>
                ))}
              </select>
            </div>
            <Button
              content="Ouvrir la salle"
              bgColor="bg-mainblue"
              width="w-fit"
            />
          </form>
        </div>
      </dialog>
    </div>
  );
};
