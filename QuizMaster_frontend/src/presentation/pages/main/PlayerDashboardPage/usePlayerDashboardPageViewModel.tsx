import { UserQueries } from "../../../../core/infrastructure/queries/UserQueries";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export function usePlayerDashboardPageViewModel() {
  const { userId } = useAuth();

  const [roomCode, setRoomCode] = useState("");

  const { isPending, isError, data, error } = useQuery(
    UserQueries.findUserById(userId ? parseInt(userId) : 0),
  );

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Salle ${roomCode} rejointe`);
  };

  return {
    isPending,
    isError,
    error,
    user: data,
    setRoomCode,
    onSubmit,
  };
}
