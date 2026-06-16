import { Title } from "../atoms/Title.tsx";
import { Icon } from "../atoms/Icon.tsx";
import { useEditor } from "../../contexts/EditorContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { QuizQueries } from "../../../core/infrastructure/queries/QuizQueries.ts";
import { LogOut } from "lucide-react";
import { IconButton } from "../atoms/IconButton.tsx";
import { useNavigate } from "react-router";

export const EditorHeader = () => {
  const { quizId, closeEditor } = useEditor();

  const Navigate = useNavigate();

  const { data, isPending } = useQuery({
    ...QuizQueries.findQuizById(parseInt(quizId!)),
    enabled: !!quizId,
  });

  return (
    <header className="flex justify-between items-center p-2.5 w-full bg-mainblue h-37.5">
      <Icon />
      {isPending && <span>Loading...</span>}
      {data && <Title content={data.quizName} color="text-white" />}
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          closeEditor();
          Navigate("/creatorDashboard");
        }}
        icon={<LogOut size={40} color="white" />}
        bgColor="bg-error"
        border={true}
      />
    </header>
  );
};
