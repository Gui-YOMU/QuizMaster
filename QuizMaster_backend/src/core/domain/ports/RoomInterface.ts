import type { CreateRoomDto } from "../../application/dtos/Room/CreateRoomDto.js";
import type { UpdateRoomDto } from "../../application/dtos/Room/UpdateRoomDto.js";

export interface RoomInterface {
  createRoom(room: CreateRoomDto): Promise<void>;

  updateRoom(id: number, room: UpdateRoomDto): Promise<void>;

  deleteRoom(id: number): Promise<void>;
}
