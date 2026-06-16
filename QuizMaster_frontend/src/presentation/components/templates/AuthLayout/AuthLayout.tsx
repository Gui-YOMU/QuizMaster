import { Header } from "../../organisms/Header.tsx";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="w-dvw h-dvh flex flex-col">
      <Header />
      <main className="w-full h-full flex flex-col justify-center items-center gap-6">
        <Outlet />
      </main>
    </div>
  );
}