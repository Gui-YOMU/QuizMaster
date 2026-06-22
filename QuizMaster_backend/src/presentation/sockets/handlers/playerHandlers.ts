import { Server, Socket } from "socket.io";
import { rooms } from "../roomParams.js";

export const playerHandlers = (io: Server, socket: Socket) => {
  socket.on("player-answer", ({ isGoodAnswer, playerId, roomCode }) => {
    const room = rooms[roomCode];
    if (!room) {
      return socket.emit("room-error", { message: "Salle inexistante." });
    }

    const player = room.players.find((p) => p.id === playerId);
    if (!player) {
      return socket.emit("room-error", { message: "Joueur introuvable." });
    }

    if (isGoodAnswer) {
    const currentQuestion = room.questions[room.currentQuestion];
    player.score += currentQuestion.points;
    return socket.emit("good-answer");
    }

    if(!isGoodAnswer) {
      return socket.emit("bad-answer");
    }
  });
};
