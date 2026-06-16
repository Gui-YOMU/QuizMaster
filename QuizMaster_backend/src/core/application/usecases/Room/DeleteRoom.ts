import { RoomInterface } from "../../../domain/ports/RoomInterface.js";

export class DeleteRoom {
  private roomInterface: RoomInterface;

  constructor(roomInterface: RoomInterface) {
    this.roomInterface = roomInterface;
  }

  async execute(id: number): Promise<void> {
    return this.roomInterface.deleteRoom(id);
  }
}
