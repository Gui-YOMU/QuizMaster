import { UserHeader } from "../../organisms/UserHeader.tsx";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="w-dvw h-dvh flex flex-col">
      <UserHeader />
      <main className="w-full h-full bg-bg">
        <Outlet />
      </main>
    </div>
  );
};
