import { RoomInterface } from "../../../domain/ports/RoomInterface.js";
import type { UpdateRoomDto } from "../../dtos/Room/UpdateRoomDto.js";

export class UpdateRoom {
  private roomInterface: RoomInterface;

  constructor(roomInterface: RoomInterface) {
    this.roomInterface = roomInterface;
  }

  async execute(id: number, room: UpdateRoomDto): Promise<void> {
    return this.roomInterface.updateRoom(id, room);
  }
}
