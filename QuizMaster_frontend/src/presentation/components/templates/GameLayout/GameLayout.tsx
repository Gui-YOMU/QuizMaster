import { Outlet } from "react-router";
import { GameHeader } from "../../organisms/GameHeader";

export const GameLayout = () => {
  return (
    <div className="w-dvw h-dvh flex flex-col">
      <GameHeader />
      <main className="w-full h-full bg-bg">
        <Outlet />
      </main>
    </div>
  );
};
