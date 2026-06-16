import { Server, Socket } from "socket.io";
import { UserEty } from "../../../core/domain/entities/UserEty.js";
import { rooms } from "../roomParams.js";

interface createRoomProps {
  hostId: number;
  quizId: number;
}

interface joinRoomProps {
  roomCode: string;
  playerId: number;
  playerName: string;
}

export const roomHandlers = (io: Server, socket: Socket) => {
  socket.on("create-room", ({ hostId, quizId }: createRoomProps) => {
    const roomCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    rooms[roomCode] = { host: socket.id, hostId, quizId, players: [] };

    socket.join(roomCode);

    socket.emit("room-created", { roomCode });

    console.log(`Salle ${roomCode} créée`);
  });

  socket.on(
    "join-room",
    ({ roomCode, playerId, playerName }: joinRoomProps) => {
      const room = rooms[roomCode];
      if (!room) {
        return socket.emit("error", "Salle inexistante");
      }
      room.players.push({ id: playerId, name: playerName, score: 0 });
      socket.join(roomCode);
      io.to(roomCode).emit("players-list", room.players);
    },
  );
};
