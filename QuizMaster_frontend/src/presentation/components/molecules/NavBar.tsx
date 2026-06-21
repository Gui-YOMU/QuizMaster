import { Gamepad2, LogOut, Palette, User } from "lucide-react";
import { NavButton } from "../atoms/NavButton.tsx";

interface NavBarProps {
  role: string | undefined;
}

export const NavBar = ({ role }: NavBarProps) => {
  return (
    <div className="flex justify-center gap-5">
      <div className="hidden lg:block">
        {role === "creator" && (
          <NavButton
            to="/creatorDashboard"
            icon={<Palette size={40} color="white" />}
            bgColor="bg-maingold"
          />
        )}
      </div>
      <div className="hidden lg:block">
        <NavButton
          to="/playerDashboard"
          icon={<Gamepad2 size={40} color="white" />}
          bgColor="bg-maingold"
        />
      </div>
      <NavButton
        to="/profile"
        icon={<User size={40} color="white" />}
        bgColor="bg-maingold"
      />
      <NavButton
        to="/logout"
        icon={<LogOut size={40} color="white" />}
        bgColor="bg-error"
      />
    </div>
  );
};
