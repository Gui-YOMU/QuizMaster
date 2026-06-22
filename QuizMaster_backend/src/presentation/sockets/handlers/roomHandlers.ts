import { Server, Socket } from "socket.io";
import { rooms } from "../roomParams.js";

interface createRoomProps {
  hostId: string;
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

    rooms[roomCode] = {
      host: socket.id,
      hostId,
      quizId,
      players: [],
      questions: [],
      currentQuestion: 0,
      answers: [],
    };

    socket.join(roomCode);

    socket.emit("room-created", { roomCode, hostId });

    console.log(`Salle ${roomCode} créée`);
  });

  socket.on("get-room-info", ({ roomCode }) => {
    const room = rooms[roomCode];
    if (!room) {
      return socket.emit("room-error", { message: "Salle inexistante" });
    }
    socket.emit("players-list", {
      players: room.players,
      hostId: room.hostId,
    });
  });

  socket.on(
    "join-room",
    ({ roomCode, playerId, playerName }: joinRoomProps) => {
      const room = rooms[roomCode];
      if (!room) {
        return socket.emit("room-error", { message: "Salle inexistante" });
      }
      const alreadyJoined = room.players.some(
        (player) => player.id === playerId,
      );
      if (!alreadyJoined) {
        room.players.push({ id: playerId, name: playerName, score: 0 });
        socket.join(roomCode);
      }

      io.to(roomCode).emit("players-list", {
        players: room.players,
        hostId: room.hostId,
      });
    },
  );

  socket.on("player-leave-room", ({ roomCode, playerId }) => {
    const room = rooms[roomCode];
    if (!room) {
      return socket.emit("room-error", { message: "Salle inexistante" });
    }
    const index = room.players.findIndex((player) => player.id === playerId);
    if (index === -1) {
      return socket.emit("room-error", { message: "Joueur introuvable" });
    }
    room.players.splice(index, 1);
    socket.leave(roomCode);
    io.to(roomCode).emit("players-list", {
      players: room.players,
      hostId: room.hostId,
    });
  });

  socket.on("host-leave-room", () => {
    const hostedRoom = Object.entries(rooms).find(
      ([, room]) => room.host === socket.id,
    );

    if (hostedRoom) {
      const [roomCode] = hostedRoom;
      io.to(roomCode).emit("room-closed", {
        message: "L'hôte a quitté la salle",
      });
      socket.emit("room-closed", { message: "Vous avez fermé la salle" });
      io.socketsLeave(roomCode);
      delete rooms[roomCode];
    }
  });
};
