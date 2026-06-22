import { Server, Socket } from "socket.io";
import { roomHandlers } from "./handlers/roomHandlers.js";
import { quizHandlers } from "./handlers/quizHandlers.js";
import { playerHandlers } from "./handlers/playerHandlers.js";

export const socketHandlers = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`Connecté au socket ${socket.id}`);
        
        roomHandlers(io, socket);
        quizHandlers(io, socket);
        playerHandlers(io, socket);
    })
}