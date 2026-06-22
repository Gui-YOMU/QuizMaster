import { Outlet } from "react-router";
import { EditorHeader } from "../../organisms/EditorHeader";
import { EditorBar } from "../../molecules/EditorBar";
import { EditorSideBar } from "../../organisms/EditorSideBar";
import { useEditorLayoutViewModel } from "./useEditorLayoutViewModel";
import { ComputerOnlyErrorPage } from "../../../pages/error/ComputerOnlyErrorPage/ComputerOnlyErrorPage";

export const EditorLayout = () => {
  const vm = useEditorLayoutViewModel();

  return (
    <div className="w-dvw h-dvh flex flex-col">
      <EditorHeader />
      {vm.isPending && <span>Loading ...</span>}
      {vm.isError && <span>Erreur !</span>}
      {vm.questionsList && (
        <main className="w-full h-full flex min-h-0">
          <div className="hidden w-full h-full min-h-0 p-4 lg:flex justify-center items-center gap-4">
            <EditorSideBar
              questionsList={vm.questionsList}
              onSelect={vm.onSelectQuestionId}
              selectedQuestionId={vm.selectedQuestionId}
            />
            <div className="flex flex-col justify-center items-center gap-4 w-full h-full min-h-0">
              <EditorBar
                selectedQuestionId={vm.selectedQuestionId}
                onDelete={vm.onDelete}
              />
              <div className="overflow-y-auto border-5 border-border bg-bg w-full h-full min-h-0 p-2">
                <Outlet
                  context={{
                    selectedQuestionId: vm.selectedQuestionId,
                    quizId: vm.quizId,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <ComputerOnlyErrorPage />
          </div>
        </main>
      )}
    </div>
  );
};
