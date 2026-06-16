import { RoomInterface } from "../../../domain/ports/RoomInterface.js";
import type { CreateRoomDto } from "../../dtos/Room/CreateRoomDto.js";

export class CreateRoom {
  private roomInterface: RoomInterface;

  constructor(roomInterface: RoomInterface) {
    this.roomInterface = roomInterface;
  }

  async execute(room: CreateRoomDto): Promise<void> {
    return this.roomInterface.createRoom(room);
  }
}
