import { createContext, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface GameContextType {
  socket: Socket | null;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      path: "/socket.io",
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <GameContext.Provider value={{ socket }}>{children}</GameContext.Provider>
  );
};

export function useGame() {
  const ctxt = useContext(GameContext);
  if (!ctxt) throw new Error("La fonction useGame a besoin d'un provider.");
  return ctxt;
}
