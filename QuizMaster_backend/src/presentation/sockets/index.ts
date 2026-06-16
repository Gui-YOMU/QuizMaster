import { Server, Socket } from "socket.io";
import { roomHandlers } from "./handlers/roomHandlers.js";

export const socketHandlers = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`Connecté au socket ${socket.id}`);
        
        roomHandlers(io, socket);
    })
}