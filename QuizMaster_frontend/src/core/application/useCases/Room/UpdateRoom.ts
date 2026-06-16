import type { RoomRepository } from "../../../domain/ports/RoomRepository";
import type { UpdateRoomDto } from "../../dtos/Room/UpdateRoomDto";

export class UpdateRoom {
  private readonly roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(id: number, room: UpdateRoomDto): Promise<void> {
    return this.roomRepository.updateRoom(id, room);
  }
}
