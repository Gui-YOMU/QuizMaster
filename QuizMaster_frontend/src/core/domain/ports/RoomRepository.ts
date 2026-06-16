import type { CreateRoomDto } from "../../application/dtos/Room/CreateRoomDto";
import type { UpdateRoomDto } from "../../application/dtos/Room/UpdateRoomDto";

export interface RoomRepository {
  createRoom(room: CreateRoomDto): Promise<void>;

  updateRoom(id: number, room: UpdateRoomDto): Promise<void>;

  deleteRoom(id: number): Promise<void>;
}
