import { UserQueries } from "../../../../core/infrastructure/queries/UserQueries";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useGame } from "../../../contexts/GameContext";
import { useNavigate } from "react-router";

export function usePlayerDashboardPageViewModel() {
  const { userId } = useAuth();
  const { socket } = useGame();

  const Navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");

  const { isPending, isError, data, error } = useQuery(
    UserQueries.findUserById(userId ? parseInt(userId) : 0),
  );

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    socket?.on("room-error", ({ message }: { message: string }) => {
      console.error(message);
      toast.error(message);

      return () => {
        socket.off("room-error");
      };
    });
  }, [socket])

  useEffect(() => {
    socket?.on("room-joined", ({ roomCode }) => {
    Navigate(`/roomMain/${roomCode}`);
  });

  return () => {socket?.off("room-joined")};
  }, [socket])

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("join-room", {
      roomCode,
      playerId: userId,
      playerName: data?.surname
        ? data.surname
        : `${data?.firstName} ${data?.lastName}`,
    });
    socket?.on("room-error", ({ message }: { message: string }) => {
      console.error(message);
      toast.error(message);
      return;
    });
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
