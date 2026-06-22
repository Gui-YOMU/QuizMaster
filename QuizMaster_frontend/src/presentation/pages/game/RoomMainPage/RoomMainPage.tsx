import { HostInGameView } from "../../../components/organisms/HostInGameView";
import { PlayerInGameView } from "../../../components/organisms/PlayerInGameView";
import { useRoomMainPageViewModel } from "./useRoomMainPageViewModel";

export const RoomMainPage = () => {
  const vm = useRoomMainPageViewModel();

  return (
    <div className="w-full h-full flex flex-col justify-start gap-5">
      {vm.hostId === vm.userId && (
        <HostInGameView
          quizStarted={vm.quizStarted}
          quizEnded={vm.quizEnded}
          roomCode={vm.roomCode}
          playersList={vm.playersList}
          socket={vm.socket}
          currentQuestion={vm.currentQuestion}
          isLastQuestion={vm.isLastQuestion}
          answers={vm.answers}
        />
      )}
      {vm.hostId !== vm.userId && (
        <PlayerInGameView
          quizStarted={vm.quizStarted}
          quizEnded={vm.quizEnded}
          roomCode={vm.roomCode}
          playersList={vm.playersList}
          socket={vm.socket}
          currentQuestion={vm.currentQuestion}
          answers={vm.answers}
          userId={vm.userId}
        />
      )}
    </div>
  );
};
