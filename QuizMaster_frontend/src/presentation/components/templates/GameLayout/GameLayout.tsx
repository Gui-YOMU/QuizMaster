import { Outlet } from "react-router";

export const GameLayout = () => {
  
  return (
      <main className="w-dvw h-dvh bg-bg p-3">
        <Outlet />
      </main>
  );
};
