import { Server, Socket } from "socket.io";
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

    rooms[roomCode] = { host: socket.id, hostId, quizId, players: [], questions: [], currentQuestion: 0, answers: [] };

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
      const alreadyJoined = room.players.some(
        (player) => player.id === playerId,
      );
      if (!alreadyJoined) {
        room.players.push({ id: playerId, name: playerName, score: 0 });
        socket.join(roomCode);
      }

      io.to(roomCode).emit("players-list", {players: room.players, hostId: room.hostId});
    },
  );

  socket.on("disconnect", () => {
    const hostedRoom = Object.entries(rooms).find(
      ([, room]) => room.host === socket.id,
    );

    if (hostedRoom) {
      const [roomCode] = hostedRoom;
      io.to(roomCode).emit("room-closed", "L'hôte a quitté la salle");
      io.socketsLeave(roomCode);
      delete rooms[roomCode];
    }
  });
};
