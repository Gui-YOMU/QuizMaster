import { Link } from "react-router";
import { Button } from "../../../components/atoms/Button";
import { CardTitle } from "../../../components/atoms/CardTitle";
import { Card } from "../../../components/atoms/Card";
import { useCreatorDashboardPageViewModel } from "./useCreatorDashboardPageViewModel";
import { CirclePlus } from "lucide-react";
import { QuizModal } from "../../../components/organisms/QuizModal";
import { RoomModal } from "../../../components/organisms/RoomModal";
import { ComputerOnlyErrorPage } from "../../error/ComputerOnlyErrorPage/ComputerOnlyErrorPage";

export const CreatorDashboardPage = () => {
  const vm = useCreatorDashboardPageViewModel();

  return (
    <>
      {vm.isPending && <span>Loading ...</span>}
      {vm.isError && <span>Erreur !</span>}
      {vm.user && (
        <>
          <div className="hidden h-full lg:flex justify-around items-center">
            <Card bgColor="bg-mainpurple" width="w-9/20" height="h-1/2">
              <CardTitle content="Nombre de quiz créés" />
              <div className="h-1/2 flex flex-col justify-between">
                <p className="text-6xl text-white font-bold mx-auto">
                  {vm.user.quizIds.length}
                </p>
                <Button
                  icon={<CirclePlus size={16} color="white" />}
                  content="Créer un quiz"
                  bgColor="bg-success"
                  width="w-fit"
                  onClick={vm.onCreateQuizClick}
                />
                <Link to={"/allQuiz"}>
                  <Button
                    content="Accéder à mes quiz"
                    bgColor="bg-mainblue"
                    width="w-fit"
                  />
                </Link>
              </div>
            </Card>
            <Card bgColor="bg-maingold" width="w-9/20" height="h-1/2">
              <CardTitle content="Nombre de quiz présentés" />
              <div className="h-1/2 flex flex-col justify-between">
                <p className="text-6xl text-white font-bold mx-auto">0</p>
                <Button
                  icon={<CirclePlus size={16} color="white" />}
                  content="Démarrer une partie"
                  bgColor="bg-success"
                  width="w-fit"
                  onClick={vm.onStartGameClick}
                />
                <Link to={"/creatorStats"}>
                  <Button
                    content="Accéder à mes parties"
                    bgColor="bg-mainblue"
                    width="w-fit"
                  />
                </Link>
              </div>
            </Card>
          </div>
          <div className="lg:hidden">
            <ComputerOnlyErrorPage />
          </div>
          {vm.isQuizModalOpen && (
            <QuizModal
              onClick={() => vm.setIsQuizModalOpen(false)}
              setQuizName={vm.setQuizName}
              setDescription={vm.setDescription}
              onSubmit={vm.onQuizSubmit}
              buttonContent="Démarrer l'édition"
            />
          )}
          {vm.isRoomModalOpen && (
            <RoomModal
              selectedQuiz={vm.selectedQuiz}
              onClick={() => vm.setIsRoomModalOpen(false)}
              onSelect={vm.setSelectedQuizId}
              onSubmit={vm.onRoomSubmit}
              quizList={vm.quizList ?? []}
            />
          )}
        </>
      )}
    </>
  );
};
