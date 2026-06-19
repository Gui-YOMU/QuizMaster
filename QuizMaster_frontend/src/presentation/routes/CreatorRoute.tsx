import { Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { UserQueries } from "../../core/infrastructure/queries/UserQueries";
import { OnlyCreatorErrorPage } from "../pages/error/OnlyCreatorErrorPage/OnlyCreatorErrorPage";
import { useQuery } from "@tanstack/react-query";

export const CreatorRoute = () => {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery(
  UserQueries.findUserById(userId ? parseInt(userId) : 0),
);

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (data?.role !== "creator") {
    return <OnlyCreatorErrorPage />
  }

  return <Outlet />;
}