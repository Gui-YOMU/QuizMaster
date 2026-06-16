import { QuizCard } from "../../../components/organisms/QuizCard";
import { QuizModal } from "../../../components/organisms/QuizModal";
import { RoomModal } from "../../../components/organisms/RoomModal";
import { useQuizListPageViewModel } from "./useQuizListPageViewModel";

export const QuizListPage = () => {
  const vm = useQuizListPageViewModel();

  return (
    <>
      {vm.isPending && <span>Loading ...</span>}
      {vm.isError && <span>Erreur !</span>}
      {vm.quizList && (
        <>
          <div className="p-5 grid grid-cols-4 gap-5 auto-rows-auto">
            {vm.quizList.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onPlay={vm.onStartGameClick}
                onEdit={vm.onEditQuizClick}
                onUpdate={vm.onUpdateQuizClick}
                onDelete={vm.onDelete}
              />
            ))}
          </div>
        </>
      )}
      {vm.isQuizModalOpen && (
        <QuizModal
          onClick={() => vm.setIsQuizModalOpen(false)}
          setQuizName={vm.setQuizName}
          setDescription={vm.setDescription}
          onSubmit={vm.onUpdateQuizSubmit}
          buttonContent="Enregistrer les modifications"
          quizNameValue={vm.quizName}
          descriptionValue={vm.description ?? ""}
        />
      )}
      {vm.isRoomModalOpen && (
        <RoomModal
          selectedQuiz={vm.selectedQuiz}
          onSelect={vm.setSelectedQuizId}
          onClick={() => vm.setIsRoomModalOpen(false)}
          onSubmit={vm.onRoomSubmit}
          quizList={vm.quizList ?? []}
        />
      )}
    </>
  );
};
