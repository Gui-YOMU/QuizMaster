import { CreateRoomDto } from "../../application/dtos/Room/CreateRoomDto.js";
import { UpdateRoomDto } from "../../application/dtos/Room/UpdateRoomDto.js";
import { RoomInterface } from "../../domain/ports/RoomInterface.js";

export class RoomRepository implements RoomInterface {
    createRoom(room: CreateRoomDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateRoom(id: number, room: UpdateRoomDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteRoom(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
  
}