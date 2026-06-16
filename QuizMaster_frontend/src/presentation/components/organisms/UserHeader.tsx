import { NavBar } from "../molecules/NavBar.tsx";
import { Title } from "../atoms/Title.tsx";
import { Icon } from "../atoms/Icon.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { UserQueries } from "../../../core/infrastructure/queries/UserQueries.ts";

export const UserHeader = () => {
  const { userId } = useAuth();

  const { data, isPending } = useQuery(
    UserQueries.findUserById(userId ? parseInt(userId) : 0),
  );
  
  return (
    <header className="flex justify-between items-center p-2.5 w-full bg-mainblue h-37.5">
      <Icon />
      {isPending && <span>Loading...</span>}
      {data && (
        <Title
          content={
            data.surname
              ? `${data.surname}`
              : `${data.firstName} ${data.lastName}`
          }
          color="text-white"
        />
      )}
      <NavBar role={data?.role} />
    </header>
  );
};
